const tableName = 'transactions'

module.exports = {
  async up(knex) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments()
      table.string('stripe_transaction_id').notNullable()
      table.float('amount').notNullable()
      table.string('currency').notNullable()
      table.string('email').notNullable()
      table.string('status')
      table.string('payment_method').notNullable()
      table.string('payment_method_type').notNullable()
      table.integer('stripe_payment_created')
      table.string('stripe_client_secret')
      table.timestamps()
    })
  },

  async down(knex) {
    await knex.schema.dropTable(tableName)
  }
}
