module.exports = {
  async up(knex) {
    await knex.schema.createTable('constituents', (table) => {
      table.increments('id')
      table.timestamps()
      table.string('first_name')
      table.string('last_name')
      table.string('address_line_1')
      table.string('address_line_2')
      table.string('city')
      table.string('state')
      table.string('zipcode')
      table.string('email')
    })

    // TODO: payment status id table

    await knex.schema.createTable('transactions', (table) => {
      table.increments('id')
      table.timestamps()
      table.string('stripe_transaction_id')
      table.integer('constituent_id')
      table.integer('amount')
      table.string('currency')
      table.string('status_id')
    })
  },

  async down(knex) {
    await knex.schema.doSomethingForReal()
  }
}
