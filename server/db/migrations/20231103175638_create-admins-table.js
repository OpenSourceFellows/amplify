const tableName = "admin"

module.exports = {
  //do stuff
  async up(knex) {
    //create table
    await knex.schema.createTable(tableName, table => {
      // Auto-incrementing non-nullable unsigned integer primary key "id" field. Suggest using UUID
      table.increments();
      // table fields
      table.string("first_name").notNullable()
      table.string("last_name").notNullable()
      table.string("email").notNullable()
      table.string("password").notNullable()
      table.boolean("active").notNullable()
      table.timestamp("last_login", { precision: 6 }).defaultTo(knex.fn.now(6))

      // unique field(s)
      table.unique("email")
    })
  },

  async down(knex) {
    await knex.schema.dropTable(tableName)
  }
}
