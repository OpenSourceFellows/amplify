const express = require('express')
const axios = require('axios')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()

router.get('/:campaign_id', async (req, res) => {
    const campaign_id = req.params.campaign_id;
    try {
        const result = await db('letter_versions').where('campaign_id',campaign_id);
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Whoops' });
    }
});

module.exports = router