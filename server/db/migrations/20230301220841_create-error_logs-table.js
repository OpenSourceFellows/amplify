const tableName = 'error_logs'

module.exports = {
  async up(knex) {
    // Create the table
    await knex.schema.createTable(tableName, (table) => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field
      table.increments()

      // Fields using native enum types
      table
        .enum('level', ['log', 'error', 'warn', 'info', 'debug'], {
          useNative: true,
          enumName: 'level_type'
        })
        .notNullable()

      // Simple fields
      table.string('data').notNullable()
      table.timestamps(true, true)

      // Indexes
      table.index(['level'])

      // Unique indexes
      table.unique(['level'])
    })
  },

  async down(knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)

    // Manually remove the native enum types
    await knex.raw(`DROP TYPE IF EXISTS level_type;`)
  }
}
