const { timestamps } = require('../../models/error_log')
const bcrypt = require('bcryptjs')

const table_name = 'admin'

const password = process.env.USER
// generate salt rounds
const salt = bcrypt.genSaltSync(10)
// generate hash with salt rounds
const hash = bcrypt.hashSync(password, salt)

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
        email: 'testing@test.com',
        password: hash,
        active: true,
        last_login: timestamps
      },
      {
        id: 2,
        first_name: 'William',
        last_name: 'Smith',
        email: 'testing1@test.com',
        password: hash,
        active: false,
        last_login: timestamps
      },
      {
        id: 3,
        first_name: 'Sophia',
        last_name: 'Taylor',
        email: 'testing2@test.com',
        password: hash,
        active: true,
        last_login: timestamps
      }
    ])
  }
}
