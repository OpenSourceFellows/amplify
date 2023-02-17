const express = require('express')
const router = express.Router()
const logger = require('../../utilities/winston_logger')

router.post('/log', (req, res) => {
  const { data } = req.body
  res.send(JSON.stringify(data))
  // send data to Winston
  logger.info(JSON.stringify(data))
})

module.exports = router
