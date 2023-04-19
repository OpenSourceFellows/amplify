const tableName = 'campaigns'

module.exports = {
  async up(knex) {
    await knex.schema.alterTable(tableName, (table) => {
      // Add nullable columns
      table.string('campaign_tagline').nullable()
      table.string('campaign_text').nullable()
      table.string('supplemental_text').nullable()
    })
  },

  async down(knex) {
    await knex.schema.alterTable(tableName, (table) => {
      // Drop columns
      table.dropColumn('supplemental_text')
      table.dropColumn('campaign_text')
      table.dropColumn('campaign_tagline')
    })
  }
}
