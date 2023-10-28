const express = require('express')
const router = express.Router()
const Campaign = require('../../../db/models/campaign')

router.post('/v1/campaigns', async (req, res) => {
  try {
    const addCampaign = new Campaign(req.body)
    await addCampaign.save()
    res.status(201).json(addCampaign)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

module.exports = router
