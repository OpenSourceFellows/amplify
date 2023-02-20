const express = require('express')
const router = express.Router()
const logger = require('../../utilities/winston_logger')

router.post('/log', (req, res) => {
  const { severity, data } = req.body
  res.send(JSON.stringify({ severity, data }))
  // send data to Winston
  logger.info(JSON.stringify({ severity, data }))
})

module.exports = router
