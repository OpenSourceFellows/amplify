const tableName = 'campaigns'

module.exports = {
  async up(knex) {
    await knex.schema.alterTable(tableName, (table) => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field
      table.increments()

      // Simple fields
      table.string('campaign_tagline').notNullable()
      table.string('campaign_text').notNullable()
      table.string('supplemental_text').nullable()
    })
  },

  async down(knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)
  }
}
