module.exports = {
  async seed(knex) {
    await knex('letter_templates').del()
    
    await knex('letter_templates').insert([
      {
        id: 1,
        lob_template_id: 'tmpl_51574d88e17027e',
        sendgrid_template_id: 'd-6cc5d3ab3f794b6fad01d4a45006c58b',
        merge_variables: {
          communityImpact: [
            'my family is affected by the damming of this river',
            'too many children are being forced to work at beaver malls for substandard wages'
          ],
          personalImpact: [
            'I am allergic to the hardwoods used in beaver dam construction',
            'local children are being kidnapped by beavers and indoctrinated into new age beaver spirituality',
            'local children are being kidnapped by beavers and indoctrinated into late stage beaver capitalism'
          ]
        }
      }
    ])
  }
}