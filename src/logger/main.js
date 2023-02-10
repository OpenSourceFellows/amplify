require('dotenv').config()
const buildDevLogger = require('./dev-logger')
const buildProdLogger = require('./prod-logger')

let logger = null

if (process.env.NODE_ENV === 'development') {
  logger = buildDevLogger()
} else {
  logger = buildProdLogger()
}

module.exports = logger
