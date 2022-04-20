const express = require('express')
const router = express.Router()
const LetterVersion = require('../../db/models/letter-version')

router.get('/:campaignId', async (req, res) => {
  const campaignId = req.params.campaignId
  try {
    const letterVersions = await LetterVersion.query().where(
      'campaign_id',
      campaignId
    )
    res.send(letterVersions)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

module.exports = router
