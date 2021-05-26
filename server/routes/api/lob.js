const express = require('express')
const axios = require('axios')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()

router.get('/:template_id', async (req, res) => {
    const template_id = req.params.template_id;
    var templateinfo = {};

    try {
        axios
        .get('https://api.lob.com/v1/templates/'+template_id, {
            auth: {
                username: process.env.LiveLob,      
            },
        })
        .then(function (response) {
            templateinfo = response.data
            res.send(templateinfo);
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Whoops' });
    }
});

module.exports = router