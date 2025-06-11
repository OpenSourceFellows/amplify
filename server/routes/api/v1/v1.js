const express = require('express')
const campaigns = require('./campaigns') // If the routes file is named index.js, we can omit it when we do the import instead of writing './campaigns/index'.
const letterTemplates = require('./letter-templates')

const v1Router = express.Router()

// Create the final piece of the url /campaigns
v1Router.use('/campaigns', campaigns)
v1Router.use('/letter_templates', letterTemplates)

module.exports = v1Router
