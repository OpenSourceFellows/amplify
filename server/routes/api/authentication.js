require('dotenv').config()
const express = require('express')
const router = express.Router()

const {
    getPublicMessage,
    getProtectedMessage,
} = require('../../auth/messages/messages.service')
const { checkJwt } = require('../../auth/check-jwt')

/**
 * Router Definition
 */

const messagesRouter = express.Router()

/**
 * Controller Definitions
 */

// GET messages/

router.get('/isAuthenticated', (req, res) => {
    res.send(req.oidc.isAuthenticated())
})

messagesRouter.get('/public-message', (req, res) => {
    const message = getPublicMessage()
    res.status(200).send(message)
})

messagesRouter.get('/protected-message', checkJwt, (req, res) => {
    const message = getProtectedMessage()
    res.status(200).send(message)
})

module.exports = {
    messagesRouter,
}

module.exports = router
