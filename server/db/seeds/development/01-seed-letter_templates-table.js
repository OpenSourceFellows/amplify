module.exports = {
  async seed(knex) {
    await knex('letter_templates').del()

    await knex('letter_templates').insert([
      {
        id: 1,
        name: 'test_template',
        subject: 'To Whom it May Concern',
        merge_variables: {
          representativeName: {
            choices: [],
            label: '',
            display: false
          },
          communityImpact: {
            choices: [
              'my family is affected by the damming of this river',
              'too many children are being forced to work at beaver malls for substandard wages'
            ],
            label: 'How this legislation impacts you',
            display: true
          },
          personalImpact: {
            choices: [
              'I am allergic to the hardwoods used in beaver dam construction',
              'local children are being kidnapped by beavers and indoctrinated into new age beaver spirituality',
              'local children are being kidnapped by beavers and indoctrinated into late stage beaver capitalism'
            ],
            label: 'How this legislation impacts your community',
            display: true
          }
        },
        html: '<html><body><h4>This is a test template!</h4><p>Dear {{representativeName}},<p>This campaign is important because {{communityImpact}}.</p><p>It affects me personally because {{personalImpact}}.</p></body></html>'
      }
    ])
  }
}
