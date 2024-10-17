const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Stripe, StripeError } = require('../../lib/stripe');
const { PaymentPresenter, PaymentPresenterError } = require('../../../shared/presenters/payment-presenter');
const Constituent = require('../../db/models/constituent');
const Transaction = require('../../db/models/transaction');
const Letter = require('../../db/models/letter');

const router = express.Router();

class CheckoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CheckoutError';
  }
}

// Function for payment processing with added error handling
async function processPayment(userId, paymentData) {
  try {
    // Validate user ID and payment data
    const constituent = await Constituent.findByPk(userId);
    if (!constituent) {
      throw new Error('Invalid user ID');
    }

    // Process the payment securely
    const paymentResult = await Stripe.paymentIntents.create(paymentData);

    // Handle post-payment logic
    const transaction = await Transaction.create({ userId, amount: paymentResult.amount });
    return transaction;

  } catch (error) {
    // Handle specific errors
    if (error instanceof StripeError) {
      console.error('Stripe Error:', error.message);
    } else if (error instanceof PaymentPresenterError) {
      console.error('Payment Presentation Error:', error.message);
    } else {
      console.error('General Error:', error.message);
    }
    throw error; // Here was missing the closing brace for catch block
  }
}

router.post('/create-checkout-session', async (req, res) => {
  const { donation, user, letter } = req.body;
  const origin = req.get('origin');

  console.log(`origin: ${origin}`);

  try {
    const presenter = new PaymentPresenter();
    presenter.validatePaymentAmount(donation);

    if (donation === 0 && process.env.VUE_APP_EMPTY_TRANSACTIONS === 'on') {
      const CHECKOUT_SESSION_ID = uuidv4();
      const redirectUrl = `${origin}/complete?session_id=${CHECKOUT_SESSION_ID}`;

      let constituent;
      [constituent] = await Constituent.query().where('email', user.email);
      if (!constituent) {
        constituent = await Constituent.query().insert(user);
      }

      const transaction = await Transaction.query().insert({
        stripeTransactionId: 'no-stripe-' + uuidv4(),
        constituentId: constituent.id,
        amount: donation,
        currency: 'usd',
        paymentMethod: 'credit_card',
        status: 'succeeded'
      });

      await Letter.query().insert({
        transactionId: transaction.id,
        constituentId: constituent.id,
        ...letter
      });

      return res
        .status(200)
        .json({ url: redirectUrl, sessionId: CHECKOUT_SESSION_ID })
        .end();
    }

    const redirectUrl = `${origin}/complete?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = origin;

    const stripe = new Stripe();
    const session = await stripe.createCheckoutSession(
      donation,
      redirectUrl,
      cancelUrl
    );

    let constituent;
    [constituent] = await Constituent.query().where('email', user.email);
    if (!constituent) {
      constituent = await Constituent.query().insert(user);
    }

    const transaction = await Transaction.query().insert({
      stripeTransactionId: session.paymentIntent,
      constituentId: constituent.id,
      amount: donation,
      currency: 'usd',
      paymentMethod: 'credit_card'
    });

    await Letter.query().insert({
      transactionId: transaction.id,
      constituentId: constituent.id,
      ...letter
    });

    return res
      .status(200)
      .json({ url: session.url, sessionId: session.id })
      .end();
  } catch (error) {
    console.error(error);
    let statusCode = 500;

    if (error instanceof PaymentPresenterError) {
      statusCode = 400;
    }

    return res.status(statusCode).json({ error: error.message }).end();
  }
});

router.post('/process-transaction', async (req, res) => {
  try {
    let event = req.body;
    if (!event) throw new CheckoutError('Unprocessable message');

    const data = event.data;
    const { id: paymentIntent, amount } = data.object;
    const [eventType, eventOutcome] = req.body.type.split('.');

    if (eventType !== 'payment_intent') {
      throw new CheckoutError(`Unexpected event: ${eventType}`);
    }

    const transaction = await Transaction.query().findOne({ stripe_transaction_id: paymentIntent });
    await transaction.$query().patch({ status: eventOutcome });

    const letter = await Letter.query().where({ transaction_id: transaction.id }).first();
    letter.trackingNumber = uuidv4();
    const letterTemplate = JSON.parse(letter.letterTemplate);

    const lobApiKey = process.env.LOB_API_KEY;
    const lobCredentials = Buffer.from(`${lobApiKey}:`).toString('base64');

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
    );

    if (lobResponse.status !== 200) throw new CheckoutError(lobResponse);

    await letter.$query().patch({ sent: true });

    return res.status(201).end();
  } catch (error) {
    let statusCode = 500;

    if (error instanceof CheckoutError) {
      statusCode = 400;
    } else if (error.response?.data?.error) {
      console.error(error.response.data.error);
    }

    return res.status(statusCode).json({ error: error.message }).end();
  }
});

module.exports = router;