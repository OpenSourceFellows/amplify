const tableName = 'letter_versions'

module.exports = {
  async up(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, (table) => {
      // Fields using native enum types
      table
        .enum(
          'office_division',
          ['Federal', 'State', 'County', 'Municipality'],
          { useNative: true, enumName: 'political_division' }
        )
        .notNullable()
        .defaultTo('Federal')
        .alter()

      // More simple fields
      // Limit "state" to just 2 characters
      table.string('state', 2).alter()
    })
  },

  async down(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, (table) => {
      // Simple fields
      table.string('state').alter()
      table.string('office_division').alter()
    })

    // Manually remove the native enum types
    await knex.raw(`DROP TYPE IF EXISTS political_division;`)
  }
}
