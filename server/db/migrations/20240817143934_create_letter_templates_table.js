module.exports = {
  async up(knex) {
    await knex.schema.createTable('letter_templates', (table) => {
      table.increments()
      table.timestamps()
      table.string('lob_template_id')
      table.string('sendgrid_template_id')
      table.jsonb('merge_variables')
    })

    await knex.schema.alterTable('letters', (table) => {
      table.string('lob_template_id')
      table.string('sendgrid_template_id')
    })
  },

  async down(knex) {
    await knex.schema.dropTable('letter_templates')

    await knex.schema.alterTable('letters', (table) => {
      table.dropColumn('lob_template_id')
      table.dropColumn('sendgrid_template_id')
    })
  }
}
