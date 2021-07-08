const express = require('express')
const axios = require('axios')
const { createClient } = require('../../db')
const router = express.Router()
const db = createClient()

const LOB_API_KEY = getLobApiKey()

router.get('/:templateId', async (req, res) => {
    const { templateId } = req.params
    var templateInfo = {}

    try {
        // We must use `axios` here as the `lob` package does not yet support
        // the [beta] Templates API.
        const response = axios.get(
            `https://api.lob.com/v1/templates/${templateId}`,
            {
                auth: {
                    username: LOB_API_KEY
                }
            }
        )

        templateInfo = response.data
        return res.status(200).send(templateInfo)
    }
    catch (error) {
        return handleLobError(error, res)
    }
})

module.exports = router

// Temporary implementation for fallback with deprecation warnings
function getLobApiKey () {
    const { LOB_API_KEY, LiveLob } = process.env
    const lobApiKey = LOB_API_KEY || LiveLob

    if (LiveLob) {
        if (LOB_API_KEY) {
            console.warn('Using "LOB_API_KEY" environment variable.')
            console.warn(
                'Please remove your deprecated "LiveLob" environment variable!'
            )
        } else {
            console.warn(
                'Expected "LOB_API_KEY" environment variable was not found.'
            )
            console.warn(
                'Falling back to deprecated "LiveLob" environment variable....'
            )
            console.warn(
                'Please update your environment to use the expected key!'
            )
        }
    }

    return lobApiKey
}

function handleLobError (error, res) {
    let status = 500
    let errorMessage = 'Whoops'

    if (error) {
        if (error.response) {
            status = 502

            const { status: statusCode, data: lobApiError } = error.response
            console.error(`Lob API error (${statusCode}): ${JSON.stringify(lobApiError)}`)

            // If the error is being blamed on the request...
            // See: https://docs.lob.com/#errors
            if ([400, 422].includes(statusCode)) {
                status = 400
                errorMessage = lobApiError.message
            }
        } else {
            console.error(error)
        }
    }

    return res.status(status).send({ error: errorMessage })
}
