const tableName = 'volunteers'

module.exports = {
  async up(knex) {
    // Create the table
    await knex.schema.createTable(tableName, (table) => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field
      table.increments()

      // Simple fields
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.text('physical_address').notNullable()

      // Unique indexes
      table.unique(['email'])
    })
  },

  async down(knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)
  }
}
