require('dotenv').config()
const express = require('express')
const router = express.router

router.get('/isAuthenticated', (req, res) => {
    if (req.user) {
        res.send(true)
    } else {
        res.send(false)
    }
})

module.exports = router
