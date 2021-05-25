const express = require('express')
const axios = require('axios')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()

router.get('/:template_id', async (req, res) => {
    const template_id = req.params.template_id;
    const templateinfo = {};
    try {
        
        axios
        .get('https://api.lob.com/v1/templates/', {
            params: {
                key: LiveLob,
                id: template_id
            },
        })
        .then(function (response) {
            templateinfo = response.data
            console.log(templateinfo);
       
            //res.send(congressMembers)
        })
        .catch(function (error) {
            console.log(error)
        })


        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Whoops' });
    }
});

module.exports = router