module.exports = {
  async up(knex) {
    await knex.schema.alterTable('letters', (table) => {
      table.uuid('tracking_number')
    })
  },

  async down(knex) {
    await knex.schema.alterTable('letters', (table) => {
      table.dropColumn('tracking_number')
    })
  }
}
