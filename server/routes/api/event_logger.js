const express = require('express')
const router = express.Router()
const logger = require('../../utilities/winston_logger')
const ErrorLog = require('../../db/models/error_log')

router.post('/log', async (req, res) => {
  const { severity, data } = req.body
  // send log messages to Winston
  logger.info(JSON.stringify({ severity, data }))
  res.sendStatus(200)

  // save log messages to database
  try {
    await ErrorLog.query().insert({
      level: severity,
      data: JSON.stringify(data)
    })
  } catch (error) {
    res
      .status(500)
      .send({ error: 'an error happened with the ErrorLog query insert' })
  }
})

module.exports = router
