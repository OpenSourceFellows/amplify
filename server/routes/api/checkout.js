const express = require('express')
const { Stripe, StripeError } = require('../../lib/stripe')
const {
  PaymentPresenter,
  PaymentPresenterError
} = require('../../../shared/presenters/payment-presenter')
const Constituent = require('../../db/models/constituent')
const Transaction = require('../../db/models/transaction')
const Letter = require('../../db/models/letter')

const router = express.Router()

class CheckoutError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CheckoutError'
  }
}

router.post('/create-checkout-session', async (req, res) => {
  const { donation, user, letter } = req.body
  const origin = req.get('origin')

  console.log(`origin: ${origin}`)

  try {
    const presenter = new PaymentPresenter()

    // Will throw error if invalid amount is given.
    presenter.validatePaymentAmount(donation)

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
    const stripe = new Stripe()

    // If livemode is false, disable signature checking
    // and event reconstructionfor ease of testing.
    let event
    if (stripe.livemode) {
      const signature = req.headers['stripe-signature']
      if (!signature) throw new CheckoutError('No stripe signature on request!')

      event = stripe.validateEvent(signature, req.rawBody)
    } else {
      event = req.body
      console.log(event)
    }

    const data = event.data
    const { id: paymentIntent, amount } = data.object
    const [eventType, eventOutcome] = req.body.type.split('.')

    // We are not going to send letters from here just yet
    // so we will record the transaction no matter the outcome.
    if (eventType !== 'payment_intent') {
      throw new CheckoutError(
        `Unexpected event! Received ${eventType} but it could not be processed.`
      )
    }

    await Transaction.query()
      .patch({ amount, status: eventOutcome })
      .where({ stripe_transaction_id: paymentIntent })

    return res.status(200).end()
  } catch (error) {
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
