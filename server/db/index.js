const knex = require('knex')
const knexfile = require('../../knexfile')

function createClient () {
  return knex(getConfig())
}

function getConfig () {
  const targetEnv = process.env.NODE_ENV || 'development'
  const config = knexfile[targetEnv]

  if (!config) {
    throw new Error(`No config found in "knexfile.js" for environment "${targetEnv}"`)
  }

  return config
}

module.exports = {
  createClient,
  getConfig
}
