require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
<<<<<<< HEAD
=======
const { auth } = require('express-openid-connect')

app.use(
  auth({
    authRequired: false
  })
)
>>>>>>> origin/main

// Middleware
app.use(express.json())
app.use(cors())

<<<<<<< HEAD
const amplify = require('./routes/api/amplify')
=======
const representatives = require('./routes/api/representatives')
>>>>>>> origin/main
const campaigns = require('./routes/api/campaigns')
const authentication = require('./routes/api/authentication')
const letter_versions = require('./routes/api/letter_versions')
const lob = require('./routes/api/lob')
// const give = require('./routes/api/give');

// const email = require('./routes/api/email')

<<<<<<< HEAD
app.use('/api/amplify', amplify)
=======
app.use('/api/representatives', representatives)
>>>>>>> origin/main
app.use('/api/campaigns', campaigns)
app.use('/api/authentication', authentication)
app.use('/api/letter_versions', letter_versions)
app.use('/api/lob', lob)
// app.use('/api/give', give);
// app.use('/api/library', library);
// app.use('/api/email', email);

module.exports = app
