/* eslint-disable no-unused-vars */

const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()
// // need to `npm install --save twilio` first
const twilio = require('twilio')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

module.exports = router
