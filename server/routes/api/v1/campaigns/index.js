const express = require('express')
const Campaign = require('../../../../db/models/campaign')

const router = express.Router()

// PUT request to update a campaign
router.put('/:id', async (req, res) => {
  const campaignId = req.params.id

  if (!campaignId) return res.status(404).end()

  try {
    const updatedCampaign = await Campaign.query().patchAndFetchById(
      campaignId,
      req.body.campaign
    )
    if (!updatedCampaign)
      return res.status(404).json({ msg: 'Campaign not found' }).end()

    return res.status(200).json({ campaign: updatedCampaign }).end()
  } catch (error) {
    console.error(error.message)

    return res.status(500).json({ msg: error.message }).end()
  }
})

module.exports = router
