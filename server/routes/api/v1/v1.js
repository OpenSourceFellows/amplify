const express = require('express')
const v1Router = express.Router()

// all v1 routes
const v1 = require('./campaigns')

v1Router.use(express.json())

v1Router.use('/v1/campaigns', v1)

module.exports = v1Router
