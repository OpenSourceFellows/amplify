const { encryptPassword } = require('../../../lib/encrypt')

module.exports = {
  async seed(knex) {
    // Deletes all existing entries
    await knex('admins').del()

    const password = await encryptPassword('password')

    // Insert seed entries
    await knex('admins').insert([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
        password
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@gmail.com',
        password
      }
    ])
  }
}
