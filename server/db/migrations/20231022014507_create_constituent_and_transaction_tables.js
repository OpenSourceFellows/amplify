module.exports = {
  async up(knex) {
    await knex.schema.alterTable('constituents', (table) => {
      table.timestamps()
      table.renameColumn('street_address', 'address_line_1')
      table.renameColumn('address_two', 'address_line_2')
    })

    await knex.schema.alterTable('transactions', (table) => {
      table.integer('constituent_id')
      table.foreign('constituent_id').references('constituents.id')
    })
  },

  async down(knex) {
    await knex.schema.dropTable('constituents')
    await knex.schema.dropTable('transactions')
  }
}
