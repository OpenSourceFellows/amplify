const tableName = 'campaigns'

module.exports = {
  async up(knex) {
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
      table.integer('letters_sent').nullable().alter()

      // Change type from text to string and drop NOT NULL constraint
      table.string('page_url').nullable().alter()

      // Change type from native enum to string and drop NOT NULL constraint
      table.string('cause').nullable().alter()
      table.string('type').nullable().alter()
    })

    await knex.schema.alterTable(tableName, function (table) {
      // Rename column
      table.renameColumn('letters_sent', 'letters_counter')
    })

    // Manually remove the native enum types
    await knex.raw(`DROP TYPE IF EXISTS cause_type;`)
    await knex.raw(`DROP TYPE IF EXISTS campaign_type;`)
  },

  async down(knex) {
    // Alter the table
    await knex.schema.alterTable(tableName, function (table) {
      // Rename column
      table.renameColumn('letters_counter', 'letters_sent')
    })

    await knex.schema.alterTable(tableName, function (table) {
      // Add NOT NULL constraints to simple fields
      table.string('name').notNullable().alter()
      table.string('organization').notNullable().alter()
      table.integer('letters_sent').notNullable().alter()

      // Change type from string to text and add NOT NULL constraint
      table.text('page_url').notNullable().alter()

      // Fields using native enum types
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
  }
}
