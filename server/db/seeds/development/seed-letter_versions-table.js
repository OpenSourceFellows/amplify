module.exports = {
  async seed(knex) {
    // Deletes ALL existing entries
    await knex('letter_versions').del()

    // Inserts seed entries
    await knex('letter_versions').insert([
      {
        id: 1,
        template_id: 'tmpl_1057bb6f50f81fb',
        campaign_id: 1,
        office_division: 'Federal',
        state: null,
        county: null,
        municipality: null
      },
      {
        id: 2,
        template_id: 'tmpl_9e6109bc1a3f946',
        campaign_id: 2,
        office_division: 'State',
        state: 'NY',
        county: null,
        municipality: null
      },
      {
        id: 3,
        template_id: 'tmpl_89271b28e7205a0',
        campaign_id: 3,
        office_division: 'State',
        state: 'NY',
        county: null,
        municipality: null
      },
      {
        id: 4,
        template_id: 'tmpl_85417656223f2dd',
        campaign_id: 4,
        office_division: 'State',
        state: 'NY',
        county: null,
        municipality: null
      },
      {
        id: 5,
        template_id: 'tmpl_7aaf42aada49f44',
        campaign_id: 5,
        office_division: 'State',
        state: 'CA',
        county: null,
        municipality: null
      }
    ])
  }
}
