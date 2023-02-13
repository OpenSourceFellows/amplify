require('dotenv').config()
const { format, createLogger, transports } = require('winston')
const { timestamp, combine, errors, json, colorize, printf } = format

const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [new transports.File({ filename: 'error.log' })]
})

// create log format for when we're in development
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`
})

// if we're not in production, then log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        errors({ stack: true }),
        logFormat
      ),
      defaultMeta: { service: 'user-service' }
    })
  )
}

module.exports = logger
