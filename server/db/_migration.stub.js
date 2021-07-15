module.exports = {
  async up(knex) {
    await knex.schema.doSomethingForReal()
  },

  async down(knex) {
    await knex.schema.doSomethingForReal()
  }
}
