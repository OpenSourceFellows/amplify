const tableName = 'volunteers'

module.exports = {
  async up(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Add NOT NULL constraints to simple fields
      table.string('email').notNullable().alter()
      table.string('first_name').notNullable().alter()
      table.string('last_name').notNullable().alter()
      table.string('street_address').notNullable().alter()
      table.string('city').notNullable().alter()
      table.string('state').notNullable().alter()
      table.string('zip').notNullable().alter()

      // Add unique indexes
      table.unique(['email'])
    })
  },

  async down(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Drop unique indexes
      table.dropUnique(['email'])

      // Drop NOT NULL constraints from simple fields
      table.string('email').nullable().alter()
      table.string('first_name').nullable().alter()
      table.string('last_name').nullable().alter()
      table.string('street_address').nullable().alter()
      table.string('city').nullable().alter()
      table.string('state').nullable().alter()
      table.string('zip').nullable().alter()
    })
  }
}
