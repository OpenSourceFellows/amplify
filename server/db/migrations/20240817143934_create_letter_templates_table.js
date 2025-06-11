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
      table.integer('letter_template_id').unsigned()
      table.foreign('letter_template_id').references('letter_templates.id')
      table.enu('delivery_method', ['email', 'snail_mail'], {
        useNative: true,
        enumName: 'delivery_methods'
      })
      table.string('email')
    })

    await knex.schema.alterTable('campaigns', (table) => {
      table.integer('letter_template_id').unsigned()
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
