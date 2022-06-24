// We need to require this here (AGAIN) to ensure it works with the Vue CLI loader
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const representatives = require('./routes/api/representatives')
const campaigns = require('./routes/api/campaigns')
const authentication = require('./routes/api/authentication')
const letterVersions = require('./routes/api/letter_versions')
const lob = require('./routes/api/lob')
const checkout = require('./routes/api/checkout')
//const twilio = require('./routes/api/twilio')

// Created a nested router
const apiRouter = express.Router()

// Middleware
apiRouter.use(express.json())

// Allow CORS support but only for development scenarios (e.g. to enable Postman testing)
const { NODE_ENV } = process.env
if (!NODE_ENV || NODE_ENV === 'development') {
  apiRouter.use(cors())
}

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100000 // to unblock for now, let's use a high number
})
apiRouter.use(apiLimiter)

// Routes
apiRouter.use('/representatives', representatives)
apiRouter.use('/campaigns', campaigns)
apiRouter.use('/authentication', authentication)
apiRouter.use('/letter_versions', letterVersions)
apiRouter.use('/lob', lob)
apiRouter.use('/checkout', checkout)
//apiRouter.use('/twilio', twilio)

module.exports = apiRouter
