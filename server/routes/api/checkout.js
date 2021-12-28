/* eslint-disable no-unused-vars */

const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const MIN_LETTER_COST = 150

const calculateOrderAmount = (donation = []) => {
  // calling the db to get the donation amount based on the Id
  if (donation.length > 0) {
    return donation[0].price
  }
  return MIN_LETTER_COST
}

// to-do: create a campaignId and donationId columns in the transactions table
// delete campaignId from variants
// Create checkout tables in production

router.post('/create-transaction', async (req, res) => {
  const { transaction, email, campaignId, donationId } = req.body || {}
  if (!transaction || !email) {
    return null
  }

  const formattedTransaction = {
    stripe_transaction_id: transaction.id,
    amount: transaction.amount,
    stripe_client_secret: transaction.client_secret,
    currency: transaction.currency,
    payment_method: transaction.payment_method,
    payment_method_type: transaction.payment_method_types[0],
    email // to-do: get user email from the server auth, if possible
  }

  try {
    await db('transactions').insert(formattedTransaction)
    res.send({
      status: 'ok'
    })
  } catch (error) {
    console.log({ error })
  }
})

// 1. send a request to `/create-payment-intent`
// sample request object from the UI:
// items = {
//   donationId: 2,
// }
// 2. donationId should be sent if the user chooses either 10, 15, or 20
// 3. hardcode the donationIds in the UI for now
// 4. This API will return the client secret. Use it to complete the transaction in the UI
// 5. Once the transaction is successful in the UI, pass the data to the `/`

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { items } = req.body || {}
    let donation

    if (items && items.donationId) {
      donation = await db('variants').where('id', items.donationId)
    }

    const donationAmount = calculateOrderAmount(donation)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: donationAmount,
      currency: 'usd'
    })
    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.log({ error })
  }
})

module.exports = router
