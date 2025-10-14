require('dotenv').config()
const express = require('express')
const router = express.Router()
const uuid = require('uuid') // generates session IDs
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

// below is the logic for issue #822 in regards to creating a login page

// Mock user data
const users = {
  'test@example.com': { password: 'testPassword' }
}

// Mock session store
const sessions = {}

router.post('/login', (req, res) => {
  const { email, password } = req.body

  // Look up user by email
  const user = users[email]

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid email/password' }).end()
  }

  // Generate a session ID
  const sessionId = uuid.v4()

  // Store session data on the server
  sessions[sessionId] = { email }

  // Set a cookie named 'session' that holds the value of sessionId that expires in 900000 ms (15 min)
  res.cookie('session', sessionId, { httpOnly: true, maxAge: 900000 })

  res.status(200).json({ message: 'Login successful' }).end()
})

module.exports = router
