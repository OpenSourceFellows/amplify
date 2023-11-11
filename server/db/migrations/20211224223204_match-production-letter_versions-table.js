const tableName = 'letter_versions'

module.exports = {
  async up(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Drop NOT NULL constraints from simple fields
      table.integer('campaign_id').unsigned().nullable().alter()
      table.string('template_id').nullable().alter()

      // Drop columns
      table.dropColumn('municipality')

      // Drop indexes
      table.dropIndex(['campaign_id'])

      // Drop unique indexes
      table.dropUnique(['template_id'])
    })

    await knex.schema.alterTable(tableName, function (table) {
      // Rename columns
      table.renameColumn('campaign_id', 'campaignid')
    })
  },

  async down(knex) {
    await knex.schema.alterTable(tableName, function (table) {
      // Rename columns
      table.renameColumn('campaignid', 'campaign_id')
    })

    await knex.schema.alterTable(tableName, function (table) {
      // Add NOT NULL constraints to simple fields
      table.integer('campaign_id').unsigned().notNullable().alter()
      table.string('template_id').notNullable().alter()

      // Add columns
      table.string('municipality')

      // Add indexes
      table.index(['campaign_id'])

      // Add unique indexes
      table.unique(['template_id'])
    })
  }
}
