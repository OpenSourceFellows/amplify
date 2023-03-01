const tableName = 'error_logs'

module.exports = {
  async up(knex) {
    // Create the table
    await knex.schema.createTable(tableName, (table) => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field
      table.increments()

      // Simple fields
      table.string('level')
      table.string('data')

      // Fields using native enum types
      // table
      //   .enum('level', ['debug', 'info', 'warn', 'error'], {
      //     useNative: true,
      //     enumName: 'level_type'
      //   })
      //   .notNullable()

      // Indexes
      // table.index(['name'])
      // table.index(['organization'])

      // Unique indexes
      // table.unique(['name', 'organization'])
    })
  },

  async down(knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)

    // Manually remove the native enum types
    // await knex.raw(`DROP TYPE IF EXISTS level_type;`)
  }
}
