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

router.get('/', async (req, res) => {
  try {
    const campaigns = await Campaign.query()

    return res.status(200).json({ campaigns }).end()
  } catch (error) {
    console.error(error.message)

    return res.status(500).json({ msg: 'There was a server error.' }).end()
  }
})

// Delete endpoint
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    await Campaign.query().deleteById(id)

    return res
      .status(200)
      .json({ message: 'Campaign deleted successfully' })
      .end()
  } catch (error) {
    console.log(error)

    return res.status(500).json({ error: error.message }).end()
  }
})

module.exports = router
