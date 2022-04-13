const tableName = 'variants'

module.exports = {
  async up(knex) {
    await knex.schema.createTable(tableName, (table) => {
      table.increments()
      table.float('price')
      table.string('sku')
      table.integer('quantity').defaultTo(1)
      table.string('description')
      table.integer('campaign_id').notNullable()
      table.timestamps()

      table.foreign('campaign_id').references('campaigns.id')
    })
  },

  async down(knex) {
    await knex.schema.dropTable(tableName)
  }
}
