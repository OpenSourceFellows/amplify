const express = require('express')
const router = express.Router()
const Campaign = require('../../db/models/campaign')
//const LetterVersion = require('../../db/models/letter-version')

router.get('/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  try {
    const result = await Campaign.relatedQuery('LetterVersions').for(campaignId)
    //const result = await LetterVersion.query().where('campaign_id', campaignId)
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

module.exports = router
