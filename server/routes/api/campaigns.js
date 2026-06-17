const express = require('express')
const router = express.Router()
const Campaign = require('../../db/models/campaign')

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const campaign = await Campaign.query().findById(id)
    // console.log(campaign)
    res.send(campaign)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find({}, 'name startDate endDate');
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching campaigns' });
  }
});

module.exports = router
