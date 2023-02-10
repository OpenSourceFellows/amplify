const { format, createLogger, transports } = require('winston')
const { timestamp, combine, printf, colorize, errors } = format

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`
})

function buildDevLogger() {
  return createLogger({
    format: combine(
      colorize(),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      errors({ stack: true }),
      logFormat
    ),
    defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()]
  })
}

module.exports = buildDevLogger
