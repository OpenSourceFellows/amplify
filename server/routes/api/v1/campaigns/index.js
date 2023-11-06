const express = require('express')
const Campaign = require('../../../../db/models/campaign')
const router = express.Router()

// Middleware for authentication can get passed into v1 route aggregator
// so we will assume here that someone requesting these endpoints has already
// been authorized.
router.get('/:id', async (req, res) => {
  const campaignId = req.params.id

  if (!campaignId) return res.status(404).end()

  try {
    const campaign = await Campaign.query().findById(campaignId)

    if (!campaign) return res.status(404).end()

    return res.status(200).json({ campaign }).end()
  } catch (error) {
    console.error(error.message)

    return res.status(500).json({ msg: 'There was a server error.' }).end()
  }
})

module.exports = router
