/* eslint-disable no-unused-vars */

const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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
// with a `donationAmount` as string or integer
// If user doesn't select any particular `donationAmount`, send `1` in the donationAmount
// 2. This API will return the client secret. Use it to complete the transaction in the UI

router.post('/create-payment-intent', async (req, res) => {
  try {
    const acceptableCharges = [1, 2, 20, 50]
    const { donationAmount } = req.body || {}
    const parsedDonationAmount = parseInt(donationAmount, 10)

    if (!acceptableCharges.includes(parsedDonationAmount)) {
      return res.status(400).send({ error: 'Invalid Amount' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parsedDonationAmount * 100, // in cents
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
