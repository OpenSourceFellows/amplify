const express = require('express')
const axios = require('axios')
const Lob = require('lob')
const dateFns = require('date-fns')
const LobControllers = require('../../controllers')

const router = express.Router()

const ALLOWED_ADDRESS_FIELDS = ['line1', 'line2', 'city', 'state', 'zip']
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

router.post('/create-letter', async (req, res) => {
  const { description, to, template_id } = req.body || {}
  const lobApiKey = getLobApiKey()
  const lob = new Lob({ apiKey: lobApiKey })
  try {
    // Create Lob address using variables passed into route via post body
    const addressResponse = await Lob.addresses.create({
      name: req.body.name,
      address_line1: req.body.address_line1,
      address_line2: req.body.address_line2,
      address_city: req.body.address_city,
      address_state: req.body.state,
      address_zip: req.body.address_zip,
      address_country: 'US'
    })

    // Create letter using lob library
    await lob.letters.create(
      {
        description,
        to,
        from: addressResponse,
        file: template_id,
        color: false,
        send_date: dateFns.format(dateFns.addDays(new Date(), 14), 'yyyy-MM-dd')
      },
      function (err, res) {
        console.log({ err, res })
      }
    )
    res.send({
      status: 'ok'
    })
  } catch (err) {
    console.log('something was wrong', err)
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
  return LobControllers.verifyRequestAddress(req, res)
})

module.exports = router

// Temporary implementation for fallback with deprecation warnings
function getLobApiKey() {
  const { LOB_API_KEY, LiveLob } = process.env
  const lobApiKey = LOB_API_KEY || LiveLob

  console.log({ lobApiKey })

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
