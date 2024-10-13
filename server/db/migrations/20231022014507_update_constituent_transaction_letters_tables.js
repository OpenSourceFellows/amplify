module.exports = {
  async up(knex) {
    await knex.schema.alterTable('constituents', (table) => {
      table.timestamps(false, true, false)
      table.renameColumn('street_address', 'address_line_1')
      table.renameColumn('address_two', 'address_line_2')
    })

    // Renaming
    await knex.schema.renameTable('sent_letters', 'letters')

    await knex.schema.alterTable('letters', (table) => {
      table.integer('transaction_id')
      table.foreign('transaction_id').references('transactions.id')
      table.string('letter_template')
      table.string('letter_version') // Removes fkey for letter versions
      table.string('addressee')
      table.string('address_line_1')
      table.string('address_line_2')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.string('return_address')
      table.boolean('sent').defaultTo(false)
      table.timestamps(false, true, false)

      table.dropColumn('request_id')
      table.dropColumn('requested_at')
      table.dropColumn('rep_name')
      table.dropColumn('rep_address')
      table.dropColumn('letter_version_id')
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

    await knex.schema.dropTable('letter_versions')
  },

  async down(knex) {
    await knex.schema.dropTable('constituents')
    await knex.schema.dropTable('transactions')
    await knex.schema.dropTable('sent_letters')
    await knex.schema.dropTable('letter_versions')
  }
}
