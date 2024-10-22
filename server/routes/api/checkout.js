const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { stripeInstance } = require('../../services/stripeService'); 
const { retryHandler } = require('../../utils/retryHandler');
const Letter = require('../../db/models/letter');

const router = express.Router();

class CheckoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CheckoutError';
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

      return res.status(200).json({ url: redirectUrl, sessionId: CHECKOUT_SESSION_ID }).end();
    }

    const redirectUrl = `${origin}/complete?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = origin;

    const stripe = new Stripe();
    const session = await stripe.createCheckoutSession(donation, redirectUrl, cancelUrl);

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

    return res.status(200).json({ url: session.url, sessionId: session.id }).end();
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
    const event = req.body;

    if (!event) throw new CheckoutError('Unprocessable message');

    const { id: paymentIntent, amount } = event.data.object;
    const [eventType, eventOutcome] = event.type.split('.');

    if (eventType !== 'payment_intent') {
      throw new CheckoutError(`Unexpected event! Received ${eventType} but it could not be processed.`);
    }

    const transaction = await retryHandler(() => 
      Transaction.query().findOne({ stripe_transaction_id: paymentIntent })
    );

    await retryHandler(() => transaction.$query().patch({ status: eventOutcome }));

    return res.status(201).end();
  } catch (error) {
    console.error(error.message || error.response.data.error);
    const statusCode = error instanceof CheckoutError ? 400 : 500;
    return res.status(statusCode).json({ error: error.message }).end();
  }
});

module.exports = router;
