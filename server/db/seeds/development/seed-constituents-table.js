module.exports = {
  async seed(knex) {
    await knex('constituents').del()

    await knex('constituents').insert([
      {
        email: 'tester@gmail.com',
        first_name: 'Baby',
        last_name: 'Cakes',
        address_line_1: '123 Fake St',
        city: 'Chicago',
        state: 'IL',
        zip: '60618'
      },
      {
        email: 'seadog@gmail.com',
        first_name: 'Fish',
        last_name: 'Cakes',
        address_line_1: '420 Lakeview Terrace',
        city: 'Grand Rapids',
        state: 'MI',
        zip: '49501'
      }
    ])
  }
}
