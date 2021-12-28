module.exports = {
  async seed(knex) {
    // Deletes ALL existing entries
    await knex('letter_versions').del()

    // Inserts seed entries
    await knex('letter_versions').insert([
      {
        id: 1,
        template_id: 'tmpl_1057bb6f50f81fb ',
        campaignid: 1,
        office_division: 'Federal',
        state: null,
        county: null
      },
      {
        id: 2,
        template_id: 'tmpl_1057bb6j23k81fg',
        campaignid: 1,
        office_division: 'State',
        state: 'California',
        county: null
      },
      {
        id: 3,
        template_id: 'tmpl_1057bb322qwj2f',
        campaignid: 1,
        office_division: 'County',
        state: 'California',
        county: null
      },
      {
        id: 4,
        template_id: 'tmpl_1057bb32jhiw81fg',
        campaignid: 2,
        office_division: 'County',
        state: 'California',
        county: 'Sacramento'
      },
      {
        id: 5,
        template_id: 'tmpl_1057bb21jk1lssmm',
        campaignid: 2,
        office_division: 'State',
        state: 'California',
        county: 'LA'
      },
      {
        id: 6,
        template_id: 'tmpl_1057bb3320ed30',
        campaignid: 2,
        office_division: 'Federal',
        state: null,
        county: null
      },
      {
        id: 7,
        template_id: 'tmpl_1057bb342jmdlslal',
        campaignid: 3,
        office_division: 'Federal',
        state: null,
        county: null
      },
      {
        id: 8,
        template_id: 'tmpl_1057bb12reew81fg',
        campaignid: 3,
        office_division: 'State',
        state: 'California',
        county: null
      },
      {
        id: 9,
        template_id: 'tmpl_1057bb3e23kwkkq',
        campaignid: 3,
        office_division: 'County',
        state: 'California',
        county: 'San Francisco'
      }
    ])
  }
}
