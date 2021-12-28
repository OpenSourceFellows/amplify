require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const rateLimit = require('express-rate-limit')

// Middleware
app.use(express.json())
app.use(cors())

// Rate Limiting
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB or API Gateway, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1)

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
})

// only apply to requests that begin with /api/
app.use('/api/', apiLimiter)

const representatives = require('./routes/api/representatives')
const campaigns = require('./routes/api/campaigns')
const authentication = require('./routes/api/authentication')
const letter_versions = require('./routes/api/letter_versions')
const lob = require('./routes/api/lob')
const checkout = require('./routes/api/checkout')
// const give = require('./routes/api/give');

// const email = require('./routes/api/email')

app.use('/api/representatives', representatives)
app.use('/api/campaigns', campaigns)
app.use('/api/authentication', authentication)
app.use('/api/letter_versions', letter_versions)
app.use('/api/lob', lob)
app.use('/api/checkout', checkout)
// app.use('/api/give', give);
// app.use('/api/library', library);
// app.use('/api/email', email);

module.exports = app
