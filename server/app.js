require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

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
