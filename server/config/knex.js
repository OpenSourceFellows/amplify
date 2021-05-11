// Required for Heroku PostgreSQL
// See: https://stackoverflow.com/questions/66497248/heroku-postgres-not-able-to-connect-error-no-pg-hba-conf-entry-for-host
process.env.PGSSLMODE = 'no-verify';

const knex = require('knex')({
    client: 'pg',
    connection: process.env.HEROKU_POSTGRESQL_GREEN_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  module.exports = knex;