require('dotenv').config()
const express = require('express')
const router = express.Router()

router.get('/isAuthenticated', (req, res) => {
    res.send(req.oidc.isAuthenticated())
})

module.exports = router
