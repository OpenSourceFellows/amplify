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
        name: 'The Breath Act',
        cause: 'Civic Rights',
        type: 'Grant',
        page_url: 'www.thebreatheact.org',
        letters_counter: 0
      },
      {
        id: 2,
        organization: 'AAAJ',
        name: 'AAAJ',
        cause: 'Education',
        type: 'Accelerator',
        page_url: 'www.aaaj.org ',
        letters_counter: 0
      },
      {
        id: 3,
        organization: 'TheSoapBox Project',
        name: 'ClimateCare',
        cause: 'Climate Justice',
        type: 'Starter',
        page_url: 'www.thesoapboxproject.com',
        letters_counter: 0
      }
    ])
  }
}
