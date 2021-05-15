module.exports = {

  async seed (knex) {
    // Deletes ALL existing entries
    await knex('letter_versions').del()

    // Inserts seed entries
    await knex('letter_versions').insert([
      { id: 1, template_id: 'tmpl_1057bb6f50f81fb ', campaign_id: 1, office_division:'Federal', state: null, county: null, municipality: null },
      { id: 2, template_id: 'tmpl_1057bb6j23k81fg', campaign_id: 1, office_division:'State', state:'California', county: null, municipality: null },
      { id: 3, template_id: 'tmpl_1057bb322qwj2f', campaign_id: 1, office_division:'County', state:'California', county: null, municipality: null },
      { id: 4, template_id: 'tmpl_1057bb32jhiw81fg', campaign_id: 2, office_division:'County', state:'California', county: 'Sacramento', municipality: null},
      { id: 5, template_id: 'tmpl_1057bb21jk1lssmm', campaign_id: 2, office_division:'State', state:'California', county: 'LA', municipality: null },
      { id: 6, template_id: 'tmpl_1057bb3320ed30', campaign_id: 2, office_division:'Federal', state:null, county: null, municipality: null },
      { id: 7, template_id: 'tmpl_1057bb342jmdlslal', campaign_id: 3, office_division:'Federal', state:null, county: null, municipality: null },
      { id: 8, template_id: 'tmpl_1057bb12reew81fg', campaign_id: 3, office_division:'State', state:'California', county: null, municipality: null},
      { id: 9, template_id: 'tmpl_1057bb3e23kwkkq', campaign_id: 3, office_division:'County', state:'California', county: 'San Francisco', municipality: null }
    ])
  }

}
