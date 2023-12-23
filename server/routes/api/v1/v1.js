const express = require('express')
const routeCollector = express.Router()

// Require the actual route files
const admin = require('./admin')

// Use the routes
routeCollector.use('/admin', admin)

module.exports = routeCollector
