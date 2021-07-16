const knex = require('knex')
const knexfile = require('../../knexfile')

function createClient(config) {
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main

    return config
}

function getEnv() {
<<<<<<< HEAD
    let targetEnv = process.env.NODE_ENV || 'development'
    // Prefer `--env test` and `--env=test` command line arguments if provided
    process.argv.forEach((val, i) => {
        if (val === '--env' && process.argv[i + 1]) {
            targetEnv = process.argv[i + 1]
        } else if (val.startsWith('--env=') && val.length > 6) {
            targetEnv = val.slice(6)
        }
    })
    return targetEnv
=======
  let targetEnv = process.env.NODE_ENV || 'development'
  // Prefer `--env test` and `--env=test` command line arguments if provided
  process.argv.forEach((val, i) => {
    if (val === '--env' && process.argv[i + 1]) {
      targetEnv = process.argv[i + 1]
    } else if (val.startsWith('--env=') && val.length > 6) {
      targetEnv = val.slice(6)
    }
  })
  return targetEnv
>>>>>>> origin/main
}

module.exports = {
    createClient,
    getConfig,
    getEnv,
}
