module.exports = {
  async up(knex) {
    await knex.schema.alterTable('letters', (table) => {
      table.jsonb('merge_variables').nullable()
    })
  },

  async down(knex) {
    await knex.schema.alterTable('letters', (table) => {
      table.dropColumn('merge_variables')
    })
  }
}
