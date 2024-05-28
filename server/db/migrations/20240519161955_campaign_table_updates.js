module.exports = {
  async up(knex) {
    await knex.schema.alterTable('campaigns', (table) => {
      table.jsonb('representatives').nullable()
      table.jsonb('assets').nullable()
      table.dropColumn('campaign_text')
      table.dropColumn('supplemental_text')
    })

    await knex.schema.alterTable('campaigns', (table) => {
      table.text('campaign_text')
      table.text('supplemental_text')
    })
  },

  async down(knex) {
    await knex.schema.alterTable('campaigns', (table) => {
      table.dropColumn('representatives')
      table.dropColumn('assets')
    })
  }
}
