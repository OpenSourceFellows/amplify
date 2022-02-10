require('dotenv').config()
const express = require('express')
const router = express.Router()

const {
  getPublicMessage,
  getProtectedMessage
} = require('../../auth/messages/messages.service')
const { checkJwt } = require('../../auth/check-jwt')

router.get('/isAuthenticated', checkJwt, (req, res) => {
  res.send(true)
})

router.get('/public-message', (req, res) => {
  const message = getPublicMessage()
  res.status(200).send(message)
})

router.get('/protected-message', checkJwt, (req, res) => {
  const message = getProtectedMessage()
  res.status(200).send(message)
})

module.exports = router
