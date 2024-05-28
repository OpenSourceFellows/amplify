module.exports = {
  async up(knex) {
    await knex.schema.alterTable('letters', (table) => {
      table.dropColumn('letter_template')
    })

    await knex.schema.alterTable('letters', (table) => {
      table.text('letter_template')
    })
  },

  async down(knex) {
    knex.schema.alterTable('letters', (table) => {
      table.dropColumn('letter_template')
    })
  }
}
