module.exports = {
  async up(knex) {
    await knex.schema.createTable('letter_templates', (table) => {
      table.increments()
      table.timestamps(false, true, false)
      table.string('name').notNullable()
      table.string('subject').notNullable()
      table.text('html').notNullable()
      table.jsonb('merge_variables').notNullable()
    })

    await knex.schema.alterTable('letters', (table) => {
      table.integer('letter_template_id').unsigned().notNullable()
      table.foreign('letter_template_id').references('letter_templates.id')
    })

    await knex.schema.alterTable('campaigns', (table) => {
      table.integer('letter_template_id').unsigned().notNullable()
      table.foreign('letter_template_id').references('letter_templates.id')
    })
  },

  async down(knex) {
    await knex.schema.dropTable('letter_templates')

    await knex.schema.alterTable('letters', (table) => {
      table.dropColumn('letter_template_id')
    })

    await knex.schema.alterTable('campaigns', (table) => {
      table.dropColumn('letter_template_id')
    })
  }
}
