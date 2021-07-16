const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()

router.get('/:campaignid', async (req, res) => {
<<<<<<< HEAD
    const campaignid = req.params.campaignid
    try {
        const result = await db('letter_versions').where(
            'campaignid',
            campaignid
        )
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Whoops' })
    }
=======
  const campaignid = req.params.campaignid
  try {
    const result = await db('letter_versions').where('campaignid', campaignid)
    res.send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
>>>>>>> origin/main
})

module.exports = router
