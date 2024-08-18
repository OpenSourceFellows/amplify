module.exports = {
  async seed(knex) {
    await knex('letter_templates').del()
    
    await knex('letter_templates').insert([
      {
        id: 1,
        lob_template_id: 'tmpl_4ffaf2960112b63',
        sendgrid_template_id: '',
        merge_variables: {
          community: ['Klamath', 'Joaquin Valley', 'the Hoopa Tribe']
        }
      }
    ])
  }
}