const tableName = 'sent_letters'

module.exports = {
  async up(knex) {
    // Create the table
    await knex.schema.createTable(tableName, (table) => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field
      table.increments()

      // Foreign key references
      table.integer('letter_version_id').unsigned().notNullable()
      table.foreign('letter_version_id').references('letter_versions.id')

      table.integer('volunteer_id').unsigned().notNullable()
      table.foreign('volunteer_id').references('volunteers.id')

      // The Lob API response ID, for tracking and management purposes
      table.string('request_id').notNullable()

      // Timestamp field
      table.timestamp('requested_at').notNullable().defaultTo(knex.fn.now())

      // Simple fields
      table.string('rep_name').notNullable()
      table.text('rep_address').notNullable()

      // Indexes
      table.index(['letter_version_id'])
      table.index(['volunteer_id'])
      table.index(['rep_name'])

      // Unique indexes
      table.unique(['request_id'])
    })
  },

  async down(knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)
  }
}
