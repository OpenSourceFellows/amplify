const express = require('express')
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')
const { Stripe, StripeError } = require('../../lib/stripe')
const {
  PaymentPresenter,
  PaymentPresenterError
} = require('../../../shared/presenters/payment-presenter')
const Handlebars = require('../../lib/handlebars')
const Constituent = require('../../db/models/constituent')
const Transaction = require('../../db/models/transaction')
const Letter = require('../../db/models/letter')
const LetterTemplate = require('../../db/models/letter-template')

const router = express.Router()

class CheckoutError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CheckoutError'
  }
}

router.post('/create-checkout-session', async (req, res) => {
  let { donation, user, letter, deliveryMethods } = req.body
  console.dir(user)
  console.dir(letter)
  const origin = req.get('origin')

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
      // Re-render the letter html, merging user data to be saved in case that's in the template.
      letter.merge_variables = {
        ...letter.merge_variables,
        firstName: user.firstName,
        lastName: user.lastName
      }
      const template = await LetterTemplate.query().findById(
        letter.letter_template_id
      )
      const html = Handlebars.render(letter.merge_variables, template.html)

      // Using a temporary mapping here also
      for (const method of deliveryMethods) {
        // Generate a uuid so letters are idempotent
        letter.trackingNumber = uuidv4()
        console.log(letter.trackingNumber)

        await Letter.query().insert({
          transactionId: transaction.id,
          constituentId: constituent.id,
          letterTemplate: html,
          deliveryMethod: method,
          ...letter
        })
      }

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

    // Re-render the letter html, merging user data to be saved in case that's in the template.
    letter.merge_variables = {
      ...letter.merge_variables,
      firstName: user.firstName,
      lastName: user.lastName
    }
    const template = await LetterTemplate.query().findById(
      letter.letter_template_id
    )
    const html = Handlebars.render(letter.merge_variables, template.html)

    // Using a temporary mapping here also
    for (const method of deliveryMethods) {
      // Generate a uuid so letters are idempotent
      letter.trackingNumber = uuidv4()
      console.log(letter.trackingNumber)

      await Letter.query().insert({
        transactionId: transaction.id,
        constituentId: constituent.id,
        letterTemplate: html,
        deliveryMethod: method,
        ...letter
      })
    }

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

    const transaction = await Transaction.query().findOne({
      stripe_transaction_id: paymentIntent
    })
    await transaction.$query().patch({ status: eventOutcome })

    const letter = await Letter.query()
      .where({ transaction_id: transaction.id })
      .first()
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

    await letter.$query().patch({ sent: true })

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
