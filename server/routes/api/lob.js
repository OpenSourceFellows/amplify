const express = require('express')
const axios = require('axios')
const Lob = require('lob')

const router = express.Router()

const ALLOWED_ADDRESS_FIELDS = [
  'name',
  'email',
  'company',
  'description',
  'line1',
  'line2',
  'city',
  'state',
  'zip'
]
const VALID_US_ZIP_CODE_MATCH = /^(?:\d{1,4}|\d{5}(?:[+-]?\d{4})?)$/
const DELIVERABILITY_WARNINGS = {
  undeliverable: 'Address is not deliverable',
  deliverable_incorrect_unit:
    'Address may be deliverable but contains a suite number that does not exist',
  deliverable_missing_unit:
    'Address may be deliverable but is missing a suite number',
  deliverable_unnecessary_unit:
    'Address may be deliverable but contains an unnecessary suite number'
}

router.post('/createAddress', async (req, res) => {
  // Get description, to, and template_id from request body
  const address = req.body || {}
  const lobApiKey = getLobApiKey()
  const lob = new Lob({ apiKey: lobApiKey })

  // Very rough schema validation
  try {
    const keys = Object.keys(address || {}).sort()
    if (!address || keys.length === 0) {
      throw new Error('Address object cannot be empty')
    }

    const disallowedKeys = keys.reduce((badKeys, key) => {
      if (!ALLOWED_ADDRESS_FIELDS.includes(key)) {
        badKeys.push(key)
      }
      return badKeys
    }, [])

    if (disallowedKeys.length > 0) {
      throw new Error(
        `Address object contained unexpected keys: ${JSON.stringify(
          disallowedKeys
        )}`
      )
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
        throw new Error(
          `Address object contained an invalid ZIP code: ${zipCode}`
        )
      }
    } else if (!((address.city || '').trim() && (address.state || '').trim())) {
      throw new Error(
        'Address object must include both city and state, or a ZIP code'
      )
    }
  } catch (validationError) {
    return res.status(400).send({ error: validationError.message })
  }

  try {
    const response = await lob.usVerifications.verify({
      primary_line: address.line1,
      secondary_line: address.line2,
      city: address.city,
      state: address.state,
      zip_code: address.zip
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
    } = response

    const isUndeliverable =
      !deliverability || deliverability === 'undeliverable'
    const isResidential = addressType === 'residential'
    const isPostOfficeBox = recordType === 'po_box'
    const isPuertoRico = revisedState === 'PR'

    const deliverable =
      !isUndeliverable && isResidential && !isPostOfficeBox && !isPuertoRico

    if (!deliverable) {
      let errorMessage = 'Address is undeliverable'
      if (!isUndeliverable) {
        if (!isResidential) {
          errorMessage = 'Non-residential addresses are not currently supported'
        } else if (isPostOfficeBox) {
          errorMessage = 'Post office boxes are not currently supported'
        } else if (isPuertoRico) {
          errorMessage = 'Puerto Rico addresses are not currently supported'
        }
      }

      return res.status(400).send({ error: errorMessage })
    }

    // Create Lob address using variables passed into route via post body
    const addressResponse = await lob.addresses.create({
      description: address.description,
      name: address.name,
      address_line1: revisedLine1,
      address_line2: revisedLine2,
      address_city: revisedCity,
      address_state: revisedState,
      address_zip: revisedZip + (revisedZipPlus4 ? `-${revisedZipPlus4}` : ''),
      address_country: 'US'
    })

    res.status(200).send({ address_id: addressResponse.id })
  } catch (error) {
    res.status(500).send({ error: 'Something failed!' })
  }
})

router.post('/createLetter', async (req, res) => {
  // Get description, to, and template_id, and paymentIntent id from request body
  const { description, to, from, template_id, paymentIntentId } = req.body || {}
  const lobApiKey = getLobApiKey()
  const lob = new Lob({ apiKey: lobApiKey })
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

  try {
    // Check for completed payment before creating letter. Status can be succeeded, failed, or pending. Return server error if failure or pending.
    const paymentVerification = await stripe.paymentIntents.retrieve(
      paymentIntentId
    )

    if (paymentVerification.status !== 'succeeded') {
      return res
        .status(500)
        .json({ msg: 'Payment is still pending or has failed.' })
        .end()
    }

    // Create Lob address using variables passed into route via post body
    const letter = await lob.letters.create({
      description: description,
      to: {
        name: to.name,
        address_line1: to.line1,
        address_line2: to.line2,
        address_city: to.city,
        address_state: to.state,
        address_zip: to.zip
      },
      from: from.address_id,
      file: template_id,
      color: false
    })

    res
      .status(200)
      .send({ expected_delivery_date: letter.expected_delivery_date })
  } catch (error) {
    // We'll need a stripe test env key to test this in our integration tests
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId
    })
    // TODO handle error for refund error. Not doing this currently because chance of
    // user making it this far in the process and both LOB API and Stripe failing is very small.
    res.status(500).send({
      error: `Something failed! A refund of ${refund.amount} ${refund.currency} has been issued`
    })
  }
})

router.get('/templates/:templateId', async (req, res) => {
  const { templateId } = req.params
  var templateInfo = {}

  try {
    // We must use `axios` here as the `lob` package does not yet support
    // the [beta] Templates API.
    const response = await axios.get(
      `https://api.lob.com/v1/templates/${templateId}`,
      {
        auth: { username: getLobApiKey() }
      }
    )

    templateInfo = response.data
    return res.status(200).send(templateInfo)
  } catch (error) {
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

    const disallowedKeys = keys.reduce((badKeys, key) => {
      if (!ALLOWED_ADDRESS_FIELDS.includes(key)) {
        badKeys.push(key)
      }
      return badKeys
    }, [])

    if (disallowedKeys.length > 0) {
      throw new Error(
        `Address object contained unexpected keys: ${JSON.stringify(
          disallowedKeys
        )}`
      )
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
        throw new Error(
          `Address object contained an invalid ZIP code: ${zipCode}`
        )
      }
    } else if (!((address.city || '').trim() && (address.state || '').trim())) {
      throw new Error(
        'Address object must include both city and state, or a ZIP code'
      )
    }
  } catch (validationError) {
    return res.status(400).send({ error: validationError.message })
  }

  const { line1, line2, city, state, zip } = address
  // Ensure the ZIP code is at least 5 digits
  const zipCode = zip ? zip.padStart(5, '0') : null

  try {
    const lob = new Lob({ apiKey: getLobApiKey() })
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
    } = response

    const isUndeliverable =
      !deliverability || deliverability === 'undeliverable'
    const isResidential = addressType === 'residential'
    const isPostOfficeBox = recordType === 'po_box'
    const isPuertoRico = revisedState === 'PR'

    const deliverable =
      !isUndeliverable && isResidential && !isPostOfficeBox && !isPuertoRico
    const warning = DELIVERABILITY_WARNINGS[deliverability] || null

    if (!deliverable) {
      let errorMessage = 'Address is undeliverable'
      if (!isUndeliverable) {
        if (!isResidential) {
          errorMessage = 'Non-residential addresses are not currently supported'
        } else if (isPostOfficeBox) {
          errorMessage = 'Post office boxes are not currently supported'
        } else if (isPuertoRico) {
          errorMessage = 'Puerto Rico addresses are not currently supported'
        }
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
function getLobApiKey() {
  const { LOB_API_KEY, LiveLob } = process.env
  const lobApiKey = LOB_API_KEY || LiveLob

  if (LiveLob) {
    if (LOB_API_KEY) {
      console.warn('Using "LOB_API_KEY" environment variable.')
      console.warn(
        'Please remove your deprecated "LiveLob" environment variable!'
      )
    } else {
      console.warn('Expected "LOB_API_KEY" environment variable was not found.')
      console.warn(
        'Falling back to deprecated "LiveLob" environment variable....'
      )
      console.warn('Please update your environment to use the expected key!')
    }
  }

  return lobApiKey
}

function handleLobError(error, res) {
  let status = 500
  let errorMessage = 'Whoops'

  if (error) {
    // error.response is from the `axios` package
    // error._response is from the `lob` package
    if (error.response || error._response) {
      status = 502

      let lobStatus = null
      let lobApiError = {}

      // Handle Lob API errors from `axios` requests
      if (error.response) {
        lobStatus = error.response.status
        lobApiError = error.response.data.error
      }
      // Handle Lob API errors from `lob` requests
      else if (error._response) {
        lobStatus = error._response.statusCode
        lobApiError = error._response.body.error
      }

      if (process.env.NODE_ENV !== 'test') {
        console.error(
          `Lob API error (${lobStatus}): ${JSON.stringify(lobApiError)}`
        )
      }

      // If the error is being blamed on the request...
      // See: https://docs.lob.com/#errors
      if ([400, 404, 422].includes(lobStatus)) {
        status = 400
        errorMessage = lobApiError.message
      }
    } else {
      console.error(error)
    }
  }

  return res.status(status).send({ error: errorMessage })
}
