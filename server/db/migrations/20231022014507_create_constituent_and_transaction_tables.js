module.exports = {
  async up(knex) {
    await knex.schema.alterTable('constituents', (table) => {
      table.timestamps(false, true, false)
      table.renameColumn('street_address', 'address_line_1')
      table.renameColumn('address_two', 'address_line_2')
    })

    await knex.schema
      .alterTable('transactions', (table) => {
        table.integer('constituent_id')
        table.foreign('constituent_id').references('constituents.id')

        // Timestamps are not implemented with proper defaults so we need to drop them here...
        table.dropTimestamps()

        table.dropColumn('payment_method_type')
        table.dropColumn('email')
      })
      .then(() => {
        // ...then we add timestamps again here.
        return knex.schema.alterTable('transactions', (table) => {
          table.timestamps(false, true, false)
        })
      })
  },

  async down(knex) {
    await knex.schema.dropTable('constituents')
    await knex.schema.dropTable('transactions')
  }
}
