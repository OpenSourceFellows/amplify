module.exports = {
  async seed(knex) {
    await knex('transactions').del()

    await knex('transactions').insert([
      {
        stripe_transaction_id: 'pi_test-success-1234',
        amount: 10000,
        currency: 'usd',
        status: null,
        payment_method: 'credit_card',
        constituent_id: 1
      },
      {
        stripe_transaction_id: 'pi_test-failed-5678',
        amount: 5000,
        currency: 'usd',
        status: null,
        payment_method: 'credit_card',
        constituent_id: 2
      }
    ])
  }
}
