const { timestamps } = require('../../models/error_log')
const table_name = 'admin'

// placeholder password
const password = 'password'

module.exports = {
  //todo do stuff
  async seed(knex) {
    // Deletes ALL existing entries
    await knex(table_name).del()

    // Inserts seed entries
    await knex(table_name).insert([
      {
        id: 1,
        first_name: 'Ethan',
        last_name: 'Garcia',
        email: 'email_1@test.com',
        password: password,
        active: true,
        last_login: timestamps
      },
      {
        id: 2,
        first_name: 'William',
        last_name: 'Smith',
        email: 'email_2@test.com',
        password: password,
        active: false,
        last_login: timestamps
      },
      {
        id: 3,
        first_name: 'Sophia',
        last_name: 'Taylor',
        email: 'email_3@test.com',
        password: password,
        active: true,
        last_login: timestamps
      }
    ])
  }
}
