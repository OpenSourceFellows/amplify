const express = require('express')
const router = express.Router()
const Campaign = require('../../db/models/campaign')

router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.query().findById(req.params.id)
    if (campaign) {
      res.send(campaign)
    } else {
      res.status(404).send('Campaign not found')
    }
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// below is where you would find the V1 endpoints for the GET all campaigns, POST a new campaign, PUT an existing campaign, and DELETE (maye) a campaign

module.exports = router
