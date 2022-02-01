const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()

router.get('/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  try {
    const result = await db('letter_versions').where('campaign_id', campaignId)
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

module.exports = router
