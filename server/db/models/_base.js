const { Model } = require('objection')
const { createClient } = require('../')

// One-time configuration to link all Objection models with Knex
Model.knex(createClient())

// Export the Objection Model base class
module.exports = Model
