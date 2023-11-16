const express = require('express')
const router = express.Router()

const { Stripe } = require('../../lib/stripe')
const {
  PaymentPresenter,
  PaymentPresenterError
} = require('../../../presenters/payment-presenter')
const Constituent = require('../../db/models/constituent')
const Transaction = require('../../db/models/transaction')

router.post('/create-checkout-session', async (req, res) => {
  const { donationAmount, user } = req.body
  const origin = req.get('origin')

  console.log(`origin: ${origin}`)

  try {
    const presenter = new PaymentPresenter()

    const formattedDonation = presenter.formatPaymentAmount(donationAmount)

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
    console.log(constituent)

    const transaction = await Transaction.query().insert({
      stripeTransactionId: session.id,
      constituentId: constituent.id,
      amount: formattedDonation,
      currency: 'USD',
      paymentMethod: 'credit_card'
    })
    console.log(transaction)

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

module.exports = router
