module.exports = {
  async seed(knex) {
    // Deletes ALL existing entries
    await knex('letter_versions').del() // Because these have foreign keys linked to the campaigns table
    await knex('campaigns').del()

    // Inserts seed entries
    await knex('campaigns').insert([
      {
        id: 1,
        organization: 'M4BL',
        name: 'The Breathe Act',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'breatheact.org'
      },
      {
        id: 2,
        organization: 'Sunrise New York',
        name: 'Climate and Community Investment Act',
        cause: 'Climate Justice',
        type: 'Grant',
        page_url: 'climatecantwait.org'
      },
      {
        id: 3,
        organization: 'Sunrise New York',
        name: 'Energy Efficiency, Equity and Jobs Assembly Bill',
        cause: 'Climate Justice',
        type: 'Grant',
        page_url: 'climatecantwait.org'
      },
      {
        id: 4,
        organization: 'Sunrise New York',
        name: 'Proposed Actions on EJ Communities',
        cause: 'Climate Justice',
        type: 'Grant',
        page_url: 'climatecantwait.org'
      },
      {
        id: 5,
        organization: "Sogorea 'Te Land Trust",
        name: "Sogorea 'Te Land Trust",
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'https://sogoreate-landtrust.org/'
      }
    ])
  }
}
