const tableName = 'campaigns'

module.exports = {
  async up(knex) {
    await knex.schema.alterTable(tableName, function (table) {
      // Add nullable columns
      table.text('logo_url')
      table.integer('letter_goal').unsigned()
      table.integer('donation_goal').unsigned()
    })
  },

  async down(knex) {
    await knex.schema.alterTable(tableName, function (table) {
      // Drop columns
      table.dropColumn('donation_goal')
      table.dropColumn('letter_goal')
      table.dropColumn('logo_url')
    })
  }
}
