const express = require('express')
const router = express.Router()
const logger = require('../../utilities/winston_logger')
const ErrorLog = require('../../db/models/error_log')

router.post('/log', async (req, res) => {
  const { severity, data } = req.body
  res.json({ severity, data })

  // send data to Winston
  logger.info(JSON.stringify({ severity, data }))

  // database migration to Postgres here:
  try {
    // console.log(typeof severity, severity)
    // console.log(typeof data, data)
    const error_log = await ErrorLog.query().insert({
      level: severity,
      data: JSON.stringify(data)
    })
    console.log(error_log)
  } catch (error) {
    res
      .status(500)
      .send({ error: 'an error happened with the ErrorLog query insert' })
  }
})

module.exports = router
