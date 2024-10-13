const tableName = 'admins'

module.exports = {
  async up(knex) {
    await knex.schema.createTable(tableName, (table) => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field
      table.increments()

      // Simple fields
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').notNullable()
      table.text('password').notNullable()
      table.boolean('active').defaultTo(true)
      // Creates an 'created_at' field and 'updated_at' field
      table.timestamps(false, true)

      // Unique index
      table.unique(['email'])
    })
  },

  async down(knex) {
    // Drop the table
    await knex.schema.dropTable(tableName)
  }
}
