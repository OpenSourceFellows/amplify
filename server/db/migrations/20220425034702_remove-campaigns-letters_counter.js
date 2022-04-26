const tableName = 'campaigns'

module.exports = {
  async up(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Drop columns
      table.dropColumn('letters_counter')
    })
  },

  async down(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Add columns
      table.integer('letters_counter').notNullable()
    })
  }
}
