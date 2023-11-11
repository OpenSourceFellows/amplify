const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { formatDonationAmount } = require('../../../util/format')
const { validateDonationAmount } = require('../../../util/validate')

router.post('/create-transaction', async (req, res) => {
  const { sessionId /*, email /*, campaignId, donationId */ } = req.body || {}
  if (!sessionId /*|| !email*/) {
    return res.status(400).send({ error: 'No session ID' })
  }
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  const formattedTransaction = {
    stripe_transaction_id: sessionId,
    amount: session.amount_total,
    currency: session.currency,
    payment_method: 'something not empty', // Not sure what this is for
    payment_method_type: session.payment_method_types[0],
    email: session.customer_details.email // to-do: get user email from the server auth, if possible
  }

  try {
    // Expire session?
    await db('transactions').insert(formattedTransaction)
    res.status(200).send(formattedTransaction)
  } catch (error) {
    console.log({ error })
    res.status(400).send()
  }

  return res.status(200).end()
})

// 1. send a request to `/create-payment-intent`
// with a `donationAmount` as string or integer
// If user doesn't select any particular `donationAmount`, send `1` in the donationAmount
// 2. This API will redirect the client to a Stripe Checkout page
// 3. Once user completes payment, will redirect back to `success_url` with
//  a Stripe session_id included in the URL.

router.post('/create-checkout-session', async (req, res) => {
  const { donationAmount } = req.body || {}
  const origin = req.get('origin')

  const input = formatDonationAmount(donationAmount)
  const inputIsValid = validateDonationAmount(input)

  if (inputIsValid) {
    const donationAmountForStripe = input * 100 // Stripe accepts values in cents
    let session

    try {
      session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Donation'
              },
              unit_amount: donationAmountForStripe
            },
            quantity: 1
          }
        ],
        mode: 'payment',
        allow_promotion_codes: true,
        success_url: origin + '/complete?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: origin
      })
    } catch (error) {
      const data = {
        type: error.type,
        code: error.raw.code,
        url: error.raw.doc_url,
        message: 'An error occurred with Stripe checkout',
        entire_error_object: error
      }

      console.log(data)
      return res.status(500).json(data)
    }
    // console.log('session:', session)

    // the redirection happens within `DonateMoney.vue`
    return res.status(200).json({ url: session.url, sessionId: session.id })
  } else {
    return res.status(400).send({
      error: 'Bad request: did not create Stripe checkout session',
      message: 'Check backend console for possible failing reasons'
    })
  }
})

module.exports = router
