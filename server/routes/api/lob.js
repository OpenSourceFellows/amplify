const express = require('express')
const axios = require('axios')
const { createClient } = require('../../db')
const Lob = require('lob')

const router = express.Router()
const db = createClient()

const LOB_API_KEY = getLobApiKey()
const lob = new Lob({ apiKey: LOB_API_KEY })

const ALLOWED_ADDRESS_FIELDS = ['line1', 'line2', 'city', 'state', 'zip']
const VALID_US_ZIP_CODE_MATCH = /^(?:\d{1,4}|\d{5}(?:[+-]?\d{4})?)$/
const DELIVERABILITY_WARNINGS = {
    undeliverable: 'Address is not deliverable',
    deliverable_incorrect_unit: 'Address may be deliverable but contains a suite number that does not exist',
    deliverable_missing_unit: 'Address may be deliverable but is missing a suite number',
    deliverable_unnecessary_unit: 'Address may be deliverable but contains an unnecessary suite number'
}

router.get(['/templates/:templateId', '/:templateId'], async (req, res) => {
    const { templateId } = req.params
    var templateInfo = {}

    try {
        // We must use `axios` here as the `lob` package does not yet support
        // the [beta] Templates API.
        const response = await axios.get(
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

router.post('/addressVerification', async (req, res) => {
    const address = req.body

    // Very rough schema validation
    try {
        const keys = Object.keys(address || {}).sort()
        if (!address || keys.length === 0) {
            throw new Error('Address object cannot be empty')
        }

        const disallowedKeys = keys.reduce(
            (badKeys, key) => {
                if (!ALLOWED_ADDRESS_FIELDS.includes(key)) {
                    badKeys.push(key)
                }
                return badKeys
            },
            []
        )

        if (disallowedKeys.length > 0) {
            throw new Error(`Address object contained unexpected keys: ${JSON.stringify(disallowedKeys)}`)
        }

        if (!(address.line1 || '').trim()) {
            throw new Error('Address object must contain a primary line (line1)')
        }

        const { zip } = address
        if (zip != null && typeof zip !== 'string') {
            throw new Error('Address object must contain a string-based ZIP code')
        }

        let zipCode = (zip || '').trim()
        if (zipCode) {
            if (!VALID_US_ZIP_CODE_MATCH.test(zipCode)) {
                throw new Error(`Address object contained an invalid ZIP code: ${zipCode}`)
            }
        } else if (!((address.city || '').trim() && (address.state || '').trim())) {
            throw new Error('Address object must include both city and state, or a ZIP code')
        }
    } catch (validationError) {
        return res.status(400).send({ error: validationError.message })
    }

    const { line1, line2, city, state, zip } = address
    // Ensure the ZIP code is at least 5 digits
    const zipCode = zip ? zip.padStart(5, '0') : null

    try {
        const response = await lob.usVerifications.verify({
            primary_line: line1,
            secondary_line: line2,
            city,
            state,
            zip_code: zipCode
        })

        const {
            deliverability,
            primary_line: revisedLine1,
            secondary_line: revisedLine2,
            components: {
                city: revisedCity,
                state: revisedState,
                zip_code: revisedZip,
                zip_code_plus_4: revisedZipPlus4,
                address_type: addressType,
                record_type: recordType
            }
        } = response.data

        const undeliverable = !deliverability || deliverability === 'undeliverable'
        const isResidential = addressType === 'residential'
        const isPostOfficeBox = recordType === 'po_box'
        const isPuertoRico = revisedState === 'PR'

        const deliverable = !undeliverable && isResidential && !isPostOfficeBox && !isPuertoRico
        const warning = DELIVERABILITY_WARNINGS[deliverability] || null

        if (!deliverable) {
            let errorMessage = null
            if (!isResidential) {
                errorMessage = 'Non-residential addresses are not currently supported'
            } else if (isPostOfficeBox) {
                errorMessage = 'Post office boxes are not currently supported'
            } else if (isPuertoRico) {
                errorMessage = 'Puerto Rico addresses are not currently supported'
            } else {
                errorMessage = 'Address is undeliverable'
            }

            return res.status(400).send({ error: errorMessage })
        }

        return res.status(200).send({
            deliverable,
            warning,
            revisedAddress: {
                line1: revisedLine1,
                line2: revisedLine2 || null,
                city: revisedCity,
                state: revisedState,
                zip: revisedZip + (revisedZipPlus4 ? '-' + revisedZipPlus4 : '')
            }
        })
    } catch (error) {
        // This endpoint should not return anything other than `200` status
        // codes, even for undeliverable addresses
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
