const tableName = 'campaigns'

module.exports = {
  async up(knex) {
    await knex.schema.alterTable(tableName, (table) => {
      // Simple fields
      table.string('campaign_tagline').nullable()
      table.string('campaign_text').nullable()
      table.string('supplemental_text').nullable()
    })
  }
}
