/* eslint-disable no-unused-vars */

const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

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

  const input = format(donationAmount);
  const [inputIsValid, message] = validate(input);
  const donationAmountForStripe = input * 100; // Stripe accepts values in cents

  if (inputIsValid) {
    const session = checkout(donationAmountForStripe, origin);
    // console.log('session:', session)

    if (session.error) {
      console.log({ error: session.error, message: 'An error occurred with Stripe checkout' });
      return res.json(session);
    }

    return res.json({ url: session.url, sessionId: session.id })
  } else {
    return res.status(400).send({ error: 'Invalid Amount; did not create Stripe checkout session', message })
  }
})

// format input value
function format(value) {
  // separating parameter assignment and parseFloat operation for consistent outcome on change
  value = parseFloat(value); // outputs: number
  value = value.toFixed(2); // outputs: string
  value = parseFloat(value); // outputs: number
  return value;
}

// validate input value
function validate(value = this.customDonationAmount) {
  let inputIsValid = true, message = "";

  if (value > 1.49 && value < 10000.01) return [inputIsValid, message];
  
  if (isNaN(value)) message = "Please select or enter a valid amount.";
  if (value < 1.5) message = "Please enter a donation amount higher than $1.50.";
  if (value > 10000) message = "Amplify currently only accept donation amounts less than $10,000."

  inputIsValid = false;
  return [inputIsValid, message]; // i.e. [ false, "Please select or enter a valid amount." ]
}

async function checkout(donationAmount, origin) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation'
            },
            unit_amount: donationAmount
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: origin + '/complete?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: origin
    })
    
    return session;
  } catch (error) {
    console.log({ error })
    return { error }
  }
}

module.exports = router
