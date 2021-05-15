module.exports = {

  async seed (knex) {
    // Deletes ALL existing entries
    await knex('letter_versions').del()

    // Inserts seed entries
    await knex('letter_versions').insert([
      { id: 1, template_id: 'tmpl_1057bb6f50f81fb ', campagin_id: 1, office_division:'Federal', state:'', county: '', municipality: '' },
      { id: 2, template_id: 'tmpl_1057bb6j23k81fg', campagin_id: 1, office_division:'State', state:'California', county: '', municipality: '' },
      { id: 3, template_id: 'tmpl_1057bb322qwj2f', campagin_id: 1, office_division:'County', state:'California', county: '', municipality: '' },
      { id: 4, template_id: 'tmpl_1057bb32jhiw81fg', campagin_id: 2, office_division:'County', state:'California', county: 'Sacramento', municipality: '' },
      { id: 5, template_id: 'tmpl_1057bb21jk1lssmm', campagin_id: 2, office_division:'State', state:'California', county: 'LA', municipality: '' },
      { id: 6, template_id: 'tmpl_1057bb3320ed30', campagin_id: 2, office_division:'Federal', state:'', county: '', municipality: '' },
      { id: 7, template_id: 'tmpl_1057bb342jmdlslal', campagin_id: 3, office_division:'Federal', state:'', county: '', municipality: '' },
      { id: 8, template_id: 'tmpl_1057bb12reew81fg', campagin_id: 3, office_division:'State', state:'California', county: '', municipality: '' },
      { id: 9, template_id: 'tmpl_1057bb3e23kwkkq', campagin_id: 3, office_division:'County', state:'California', county: 'San Francisco', municipality: '' }
    ])
  }

}
