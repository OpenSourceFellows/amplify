const tableName = 'letter_versions'

module.exports = {

  async up (knex) {
    // Create the table
    await knex.schema
      .createTable(tableName, (table) => {
        // Auto-incrementing non-nullable unsigned integer primary key "id" field
        table.increments()

        // Simple fields
        table.string('template_id').notNullable()
        table.string('state')
        table.string('county')
        table.string('municipality')

        // Fields using native enum types
        table
          .enum(
            'office_division',
            ['Federal', 'State', 'County', 'Municipality'],
            { useNative: true, enumName: 'political_division' }
          ).notNullable()
          .defaultTo('Federal')

        // Foreign key references
        table.integer('campaign_id').unsigned().notNullable()
        table.foreign('campaign_id').references('campaigns.id')

        // Indexes
        table.index(['campaign_id'])

        // Unique indexes
        table.unique(['template_id'])
      })
  },

  async down (knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)

    // Manually remove the native enum types
    await knex.raw(`DROP TYPE IF EXISTS political_division;`)
  }

}
