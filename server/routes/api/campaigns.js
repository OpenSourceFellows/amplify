const express = require('express')
const axios = require('axios')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await db('campaigns').where('id', id)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Whoops' })
    }
})

router.get('/', async (req, res) => {
    try {
        const result = await db.select('*').from('campaigns')
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Whoops' })
    }
})

module.exports = router
