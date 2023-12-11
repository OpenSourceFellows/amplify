const referencingTableName = 'sent_letters'
const oldTableName = 'volunteers'
const newTableName = 'constituents'

module.exports = {
  async up(knex) {
    // Step 1: Unbind the referencing table
    await knex.schema.alterTable(referencingTableName, (table) => {
      table.dropIndex(['volunteer_id'])
      table.dropForeign('volunteer_id')
    })

    // Step 2: Rename the primary table
    await knex.schema.renameTable(oldTableName, newTableName)

    // Step 3: Rebind the referencing table
    await knex.schema.alterTable(referencingTableName, (table) => {
      table.renameColumn('volunteer_id', 'constituent_id')
      table.foreign('constituent_id').references(`${newTableName}.id`)
      table.index(['constituent_id'])
    })

    // Step 4: Add 'phone_number' column to the 'constituents' table
    await knex.schema.alterTable(newTableName, function (table) {
      table.string('phone_number')
    })
  },

  async down(knex) {
    // Step 1: Unbind the referencing table
    await knex.schema.alterTable(referencingTableName, (table) => {
      table.dropIndex(['constituent_id'])
      table.dropForeign('constituent_id')
    })

    // Step 2: Rename the primary table
    await knex.schema.renameTable(newTableName, oldTableName)

    // Step 3: Rebind the referencing table
    await knex.schema.alterTable(referencingTableName, (table) => {
      table.renameColumn('constituent_id', 'volunteer_id')
      table.foreign('volunteer_id').references(`${oldTableName}.id`)
      table.index(['volunteer_id'])
    })

    // Step 4: Remove the 'phone_number' column from the 'constituents' table
    await knex.schema.alterTable(oldTableName, function (table) {
      table.dropColumn('phone_number')
    })
  }
}
