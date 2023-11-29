const tableName = 'constituents'

module.exports = {
  async up(knex) {
    // Alter the 'constituents' table
    await knex.schema.alterTable(tableName, function (table) {
      // Add a new column 'phone_number' as a string
      // This is used to store the phone numbers of the constituents
      table.string('phone_number')
    })
  },

  async down(knex) {
    // Revert changes made in the 'up' migration
    await knex.schema.alterTable(tableName, function (table) {
      // Remove the 'phone_number' column from the 'constituents' table
      table.dropColumn('phone_number')
    })
  }
}
