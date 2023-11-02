const express = require('express')
const router = express.Router()
const v1Campaigns = require('./api/v1Campaigns')
// const v1Admin = require('./api/v1Admin') this had to be commented out in order for the error regarding missing modules to be fixed.

router.use('/campaigns', v1Campaigns)
// router.use('/admin', v1Admin) this had to be commented out in order for the error regarding missing modules to be fixed.

module.exports = router
