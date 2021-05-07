//const pg = require('pg');

const knex = require('knex')({
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_GREEN_URL,
    searchPath: ['u8mr7sco432bg3', 'public'],
    ssl: true
  });

  module.exports = knex;