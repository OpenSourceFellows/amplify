require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const { auth } = require('express-openid-connect')

app.use(
    auth({
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        idpLogout: true,
    })
)

//Middleware
//app.use(express.json());
app.use(cors())

const amplify = require('./routes/api/amplify')
// const give = require('./routes/api/give');

// const email = require('./routes/api/email')

app.use('/api/amplify', amplify)
// app.use('/api/give', give);
// app.use('/api/library', library);
// app.use('/api/email', email);

module.exports = app
