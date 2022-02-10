const knex = require('knex')
const { getEnv } = require('./util')
const knexfile = require('../../knexfile')

function createClient(config) {
  return knex(config || getConfig())
}

function getConfig(env) {
  const targetEnv = env || getEnv()
  const config = knexfile[targetEnv]

  if (!config) {
    throw new Error(
      `No config found in "knexfile.js" for environment "${targetEnv}"`
    )
  }

  return config
}

module.exports = {
  createClient,
  getConfig,
  getEnv
}
