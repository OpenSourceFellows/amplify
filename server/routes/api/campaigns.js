const express = require('express')
const router = express.Router()
const Campaign = require('../../db/models/campaign')

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const result = await Campaign.query().select('*').where('id', id)
    console.log(result)
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await Campaign.query()
    console.log(result)
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

module.exports = router
