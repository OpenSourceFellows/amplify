module.exports = {
  async seed(knex) {
    // Deletes all existing entries
    await knex('admins').del()

    // Insert seed entries
    await knex('admins').insert([
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'password'
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'password'
      }
    ])
  }
}
