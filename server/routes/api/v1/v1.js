const express = require('express')
const campaigns = require('./campaigns')

const v1Router = express.Router()

v1Router.use('/campaigns', campaigns)

module.exports = v1Router
