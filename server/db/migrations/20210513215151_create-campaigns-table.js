const tableName = 'campaigns'

module.exports = {
  async up(knex) {
    // Create the table
    await knex.schema.createTable(tableName, (table) => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field
      table.increments()

      // Simple fields
      table.string('name').notNullable()
      table.string('organization').notNullable()
      table.text('page_url').notNullable()
      table.integer('letters_sent').notNullable()

      // Fields using native enum types
      table
        .enum('cause', ['Civic Rights', 'Education', 'Climate Justice'], {
          useNative: true,
          enumName: 'cause_type'
        })
        .notNullable()

      table
        .enum('type', ['Starter', 'Accelerator', 'Grant'], {
          useNative: true,
          enumName: 'campaign_type'
        })
        .notNullable()

      // Indexes
      table.index(['name'])
      table.index(['organization'])

      // Unique indexes
      table.unique(['name', 'organization'])
    })
  },

  async down(knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)

    // Manually remove the native enum types
    await knex.raw(`DROP TYPE IF EXISTS cause_type;`)
    await knex.raw(`DROP TYPE IF EXISTS campaign_type;`)
  }
}
