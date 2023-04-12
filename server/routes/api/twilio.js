/* eslint-disable no-unused-vars */

const express = require('express')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()
// // need to `npm install --save twilio` first
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);


module.exports = router
