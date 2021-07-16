module.exports = {
<<<<<<< HEAD
    async up(knex) {
        // await knex...
    },

    async down(knex) {
        // await knex...
    },
=======
  async up(knex) {
    await knex.schema.doSomethingForReal()
  },

  async down(knex) {
    await knex.schema.doSomethingForReal()
  }
>>>>>>> origin/main
}
