const { format, createLogger, transports } = require('winston')
const { timestamp, combine, errors, json } = format

function buildProdLogger() {
  return createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [new transports.Console()]
  })
}

module.exports = buildProdLogger
