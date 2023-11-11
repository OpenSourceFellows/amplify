const tableName = 'campaigns'

module.exports = {
  async up(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Add NOT NULL constraints to simple fields
      table.string('name').notNullable().alter()
      table.string('organization').notNullable().alter()
      table.integer('letters_counter').notNullable().alter()

      // Change type from string to text and add NOT NULL constraint
      table.text('page_url').notNullable().alter()

      // Change type from string to native enum types
      table
        .enum('cause', ['Civic Rights', 'Education', 'Climate Justice'], {
          useNative: true,
          enumName: 'cause_type'
        })
        .notNullable()
        .alter()

      table
        .enum('type', ['Starter', 'Accelerator', 'Grant'], {
          useNative: true,
          enumName: 'campaign_type'
        })
        .notNullable()
        .alter()

      // Add indexes
      table.index(['name'])
      table.index(['organization'])

      // Add unique indexes
      table.unique(['name', 'organization'])
    })
  },

  async down(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Drop unique indexes
      table.dropUnique(['name', 'organization'])

      // Drop indexes
      table.dropIndex(['organization'])
      table.dropIndex(['name'])

      // Drop NOT NULL constraints from simple fields
      table.string('name').nullable().alter()
      table.string('organization').nullable().alter()
      table.integer('letters_counter').nullable().alter()

      // Change type from text to string and drop NOT NULL constraint
      table.string('page_url').nullable().alter()

      // Change type from native enum to string and drop NOT NULL constraint
      table.string('cause').nullable().alter()
      table.string('type').nullable().alter()
    })

    // Manually remove the native enum types
    await knex.raw(`DROP TYPE IF EXISTS cause_type;`)
    await knex.raw(`DROP TYPE IF EXISTS campaign_type;`)
  }
}
