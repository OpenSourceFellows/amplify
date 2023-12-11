# Documentation - Stripe Functions

## Introduction

Amplify uses Stripe to process donations for non-profit organizations. Amplify uses these API endpoints to store and complete transactions.

## Implementation

A step by step guide for how to interact with Stripe API in Amplify.

### create-transaction API

Retrieves session from Stripe to insert into database.

1. Send session ID to API endpoint.
2. Retrieve Stripe session with that session ID.
3. Format session data to be inserted into database.
4. Insert into database.

### create-checkout-session API

Create Stripe session.

1. Send donation amount to API.
2. Format and validate donation amount.
3. Create Stripe session with the following parameters:
    1. line_items: donation amount
    2. allow_promotion_code: true
    3. success_url: redirects to /complete?session_id={CHECKOUT_SESSION_ID}
    4. cancel_url: redirects to origin
4. Send back session.url and session.id

### create-payment-intent API Endpoint

1. Send request to `/create-payment-intent` with a `donationAmount` as string or integer. If user doesn’t select any particular `donationAmount`, send `1` in the `donationAmount`
2. This API will redirect the client to a Stripe Checkout page
3. Once user completes payment, it will redirect back to `success_url` with a Stripe session_id included in the URL.