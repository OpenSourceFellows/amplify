const { getEnv } = require('./server/db/util')

const targetEnv = getEnv()
const isProduction = targetEnv === 'production'

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
    directory: './server/db/migrations',
    stub: './server/db/_migration.stub.js'
  },

  seeds: {
    directory: `./server/db/seeds/non-existent-directory`,
    stub: './server/db/_seed.stub.js'
  },

  // Turn these off in production for performance reasons
  asyncStackTraces: !isProduction,

  // Required for Heroku PostgreSQL
  ...(isProduction && {
    ssl: {
      rejectUnauthorized: false
    }
  })
}

// Export the configuration matrix
module.exports = {
  development: {
    ...baseConfig,
    connection: {
      database: 'pe_dev'
    },
    seeds: {
      ...baseConfig.seeds,
      directory: './server/db/seeds/development'
    }
  },

  test: {
    ...baseConfig,
    connection: {
      database: 'pe_test'
    },
    seeds: {
      ...baseConfig.seeds,
      directory: './server/db/seeds/test'
    }
  },

  production: {
    ...baseConfig,
    connection: process.env.DATABASE_URL
  }
}
