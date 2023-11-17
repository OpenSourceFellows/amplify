const express = require('express')
const { Stripe, StripeError } = require('../../lib/stripe')
const {
  PaymentPresenter,
  PaymentPresenterError
} = require('../../../presenters/payment-presenter')
const Constituent = require('../../db/models/constituent')
const Transaction = require('../../db/models/transaction')

const router = express.Router()

router.post('/create-checkout-session', async (req, res) => {
  const { donationAmount, user } = req.body
  const origin = req.get('origin')

  console.log(`origin: ${origin}`)

  try {
    const presenter = new PaymentPresenter()

    const formattedDonation = presenter.formatPaymentAmount(donationAmount)
    console.log(formattedDonation)

    // Will throw error if invalid amount is given.
    presenter.validatePaymentAmount(formattedDonation)

    // TODO: Should be strict https but we need to do some deployment fixes first.
    const redirectUrl = `http://${origin}/complete?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `http://${origin}`

    const stripe = new Stripe()
    const session = await stripe.createCheckoutSession(
      formattedDonation,
      redirectUrl,
      cancelUrl
    )

    // TODO: Move Constituent insert to earlier in the cycle.
    const constituent = await Constituent.query().insert(user)

    await Transaction.query().insert({
      stripeTransactionId: session.payment_intent,
      constituentId: constituent.id,
      amount: formattedDonation,
      currency: 'USD',
      paymentMethod: 'credit_card'
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

    // TODO: error logging
    return res.status(statusCode).json({ error: error.message }).end()
  }
})

router.post('/process-transaction', async (req, res) => {
  try {
    // TODO: Implement webhook secret
    const stripe = new Stripe()

    const signature = req.headers['stripe-signature']

    console.log(signature)

    const event = stripe.validateEvent(signature, req.rawBody)

    const data = event.data
    const { id: paymentIntent, amount } = data.object
    const [eventType, eventOutcome] = req.body.type.split('.')

    // We are not going to send letters from this endpoint just yet
    // so we will record the transaction no matter the outcome.
    if (eventType !== 'payment_intent') {
      throw new Error('Unexpected event!')
    }

    await Transaction.query()
      .patch({ amount, status: eventOutcome })
      .where({ stripe_transaction_id: paymentIntent })

    return res.status(200).end()
  } catch (error) {
    let statusCode = 500

    if (error instanceof StripeError) {
      // Don't leak Stripe logging.
      console.error(error.message)
      error.message = 'Payment processing error'
    }

    return res.status(statusCode).json({ error: error.message })
  }
})

module.exports = router
