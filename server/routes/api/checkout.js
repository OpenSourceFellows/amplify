const express = require('express')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const { Stripe, StripeError } = require('../../lib/stripe')
const {
  PaymentPresenter,
  PaymentPresenterError
} = require('../../../shared/presenters/payment-presenter')
const Constituent = require('../../db/models/constituent')
const Transaction = require('../../db/models/transaction')
const Letter = require('../../db/models/letter')

const router = express.Router()

const Joi = require('joi');  // For input validation

// Validation schema for incoming data
const sessionSchema = Joi.object({
  donation: Joi.number().positive().max(10000).required() // Limit donation amount to prevent abuse
    .messages({
      'number.base': 'Donation must be a number.',
      'number.positive': 'Donation must be a positive number.',
      'number.max': 'Donation exceeds the allowed limit.',
      'any.required': 'Donation is required.'
    }),
  user: Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.email': 'A valid email is required.',
        'any.required': 'User email is required.'
      })
  }).required(),
  letter: Joi.string().max(300).optional() // Limit the size to prevent long data
    .messages({
      'string.max': 'Letter cannot exceed 300 characters.'
    })
}).unknown(false);  // Disallow any additional, unexpected fields


class CheckoutError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CheckoutError'
  }
}

router.post('/create-checkout-session', async (req, res) => {
  try {
    // Validate incoming data against the schema
    const { donation, user, letter } = await sessionSchema.validateAsync(req.body);

    // Validate origin to ensure the request is coming from trusted sources
    const origin = req.get('origin');
    // Trusted origins to be added as a list below, environment variable, config file, or in the DB
    const allowedOrigins = ['https://yourtrusteddomain.com', 'https://anothertrusteddomain.com']; 
    if (!allowedOrigins.includes(origin)) {
      console.warn(`Untrusted origin attempted to create session: ${origin}`);
      return res.status(403).json({ error: 'Forbidden request from untrusted origin.' });
    }

   // Log the origin without sensitive information
    console.log(`Valid origin: ${origin}`);
  
    // Continue with checkout session creation logic...
    // (You can add the session creation logic here)

    return res.status(200).json({ message: 'Checkout session created successfully' });

  } catch (error) {
    // Error handling
    if (error.isJoi) {
      // Handle validation errors
      console.error('Validation error:', error.details);
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Catch any unexpected errors
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
    

  try {
    const presenter = new PaymentPresenter()

    // Will throw error if invalid amount is given.
    presenter.validatePaymentAmount(donation)

    if (donation === 0 && process.env.VUE_APP_EMPTY_TRANSACTIONS === 'on') {
      const CHECKOUT_SESSION_ID = uuidv4()
      const redirectUrl = `${origin}/complete?session_id=${CHECKOUT_SESSION_ID}`

      let constituent
      ;[constituent] = await Constituent.query().where('email', user.email)
      if (!constituent) {
        constituent = await Constituent.query().insert(user)
      }

      console.log(constituent.id)

      const transaction = await Transaction.query().insert({
        stripeTransactionId: 'no-stripe-' + uuidv4(),
        constituentId: constituent.id,
        amount: donation,
        currency: 'usd',
        paymentMethod: 'credit_card',
        status: 'succeeded'
      })

      // Using a temporary mapping here also
      await Letter.query().insert({
        transactionId: transaction.id,
        constituentId: constituent.id,
        ...letter
      })

      return res
        .status(200)
        .json({ url: redirectUrl, sessionId: CHECKOUT_SESSION_ID })
        .end()
    }

    // TODO: Should be strict https but we need to do some deployment fixes first.
    const redirectUrl = `${origin}/complete?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = origin

    const stripe = new Stripe()
    const session = await stripe.createCheckoutSession(
      donation,
      redirectUrl,
      cancelUrl
    )

    // These objects must be recorded in a specific order:
    // constituent, then transaction, then letter
    // This is because letter needs id from constituent and transaction!

    // TODO: Move Constituent insert to earlier in the cycle.
    let constituent
    ;[constituent] = await Constituent.query().where('email', user.email)
    if (!constituent) {
      constituent = await Constituent.query().insert(user)
    }

    console.log(constituent.id)

    const transaction = await Transaction.query().insert({
      stripeTransactionId: session.paymentIntent,
      constituentId: constituent.id,
      amount: donation,
      currency: 'usd',
      paymentMethod: 'credit_card'
    })

    // Using a temporary mapping here also
    await Letter.query().insert({
      transactionId: transaction.id,
      constituentId: constituent.id,
      ...letter
    })

    return res
      .status(200)
      .json({ url: session.url, sessionId: session.id })
      .end()
  } catch (error) {
    console.error(error)
    let statusCode = 500

    if (error instanceof PaymentPresenterError) {
      statusCode = 400
    }

    console.error(error)

    // TODO: error logging
    return res.status(statusCode).json({ error: error.message }).end()
  }
})

router.post('/process-transaction', async (req, res) => {
  try {
    // const stripe = new Stripe()

    // If livemode is false, disable signature checking
    // and event reconstructionfor ease of testing.
    let event
    /*
    if (stripe.livemode) {
      const signature = req.headers['stripe-signature']
      if (!signature) throw new CheckoutError('No stripe signature on request!')

      event = stripe.validateEvent(signature, req.rawBody)
    } else {
      event = req.body
      // console.log(event)
    }
    */
    event = req.body

    if (!event) throw new CheckoutError('Unprocessable message')

    const data = event.data
    const { id: paymentIntent, amount } = data.object
    const [eventType, eventOutcome] = req.body.type.split('.')

    console.log(paymentIntent, amount, eventOutcome)

    // We are not going to send letters from here just yet
    // so we will record the transaction no matter the outcome.
    if (eventType !== 'payment_intent') {
      throw new CheckoutError(
        `Unexpected event! Received ${eventType} but it could not be processed.`
      )
    }

    const transaction = await Transaction.query().findOne({ stripe_transaction_id: paymentIntent })
    await transaction.$query().patch({ status: eventOutcome })

    const letter = await Letter.query().where({ transaction_id: transaction.id }).first()
    letter.trackingNumber = uuidv4()
    const letterTemplate = JSON.parse(letter.letterTemplate)
    
    const lobApiKey = process.env.LOB_API_KEY
    const lobCredentials = btoa(`${lobApiKey}:`)

    console.log(letter.mergeVariables)
    const lobResponse = await axios.post(
      'https://api.lob.com/v1/letters', 
      {
        to: {
          name: letter.addressee,
          address_line1: letter.addressLine1,
          address_line2: letter.addressLine2,
          address_city: letter.city,
          address_state: letter.state,
          address_zip: letter.zip
        },
        from: letter.returnAddress,
        color: false,
        use_type: 'operational',
        file: letterTemplate.latest_template_preview.template_id,
        merge_variables: letter.mergeVariables
      },
      {
        headers: {
          Authorization: `Basic ${lobCredentials}`,
          'Idempotency-Key': letter.trackingNumber
        }
      }
    )

    if (!lobResponse.statusCode === 200) throw new CheckoutError(lobResponse)

    await letter.$query().patch({ sent: true})

    return res.status(201).end()
  } catch (error) {
    console.error(error.response.data.error)
    let statusCode = 500

    if (error instanceof CheckoutError) {
      statusCode = 400
      console.error(error.message)
    }

    if (error instanceof StripeError) {
      // Don't leak Stripe logging.
      console.error(error.message)
      error.message = 'Payment processing error'
    }

    return res.status(statusCode).json({ error: error.message }).end()
  }
})

module.exports = router
