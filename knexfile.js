const NODE_ENV = process.env.NODE_ENV || 'development'
const isProduction = NODE_ENV === 'production'

// Required for Heroku PostgreSQL
// See: https://stackoverflow.com/questions/66497248/heroku-postgres-not-able-to-connect-error-no-pg-hba-conf-entry-for-host
if (isProduction) {
  // Set this new environment variable for the process
  process.env.PGSSLMODE = 'no-verify'
}

const baseConfig = {
  client: 'postgresql',

  pool: {
    min: 2,
    max: 10
  },

  migrations: {
    tableName: 'knex_migrations',
    directory: './server/db/migrations'
  },

  seeds: {
    directory: `./server/db/seeds/${NODE_ENV}`
  },

  // Turn these off in production for performance reasons
  asyncStackTraces: !isProduction,

  // Required for Heroku PostgreSQL
  ...isProduction && {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

// Export the configuration matrix
module.exports = {

  development: {
    ...baseConfig,
    connection: {
      database: 'pe_dev'
    }
  },

  test: {
    ...baseConfig,
    connection: {
      database: 'pe_test'
    }
  },

  production: {
    ...baseConfig,
    connection: process.env.DATABASE_URL
  }
}
