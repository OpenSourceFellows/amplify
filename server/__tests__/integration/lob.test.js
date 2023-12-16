require('dotenv').config()
const request = require('supertest')
const axios = require('axios')
const express = require('express')
const apiRouter = require('../../api')

// Create a test application
const app = express()
app.use('/api', apiRouter)

const LOB_API_HOST = 'https://api.lob.com'
const LOB_TEST_KEY_PREFIX = 'test_'

// Ensure we are using a testing key for the Lob API.
// Many of the tests will fail if using a live key instead.
beforeAll(() => {
  const { LOB_API_KEY, TEST_LOB_API_KEY } = process.env
  let lobApiKey = LOB_API_KEY || ''

  // Lob API keys starts with either "live_" (production) or "test_" (testing)
  if (
    !lobApiKey.startsWith(LOB_TEST_KEY_PREFIX) &&
    (TEST_LOB_API_KEY || '').startsWith(LOB_TEST_KEY_PREFIX)
  ) {
    lobApiKey = TEST_LOB_API_KEY
  }

  if (!lobApiKey.startsWith(LOB_TEST_KEY_PREFIX)) {
    throw new Error('You must use a test environment Lob API key!')
  }

  process.env.LOB_API_KEY = lobApiKey
})

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})

describe('GET /api/lob/templates/:templateId', () => {
  const templateId = 'tmpl_c94e83ca2cd5121'
  const route = `/api/lob/templates/${templateId}`

  // From https://docs.lob.com/#templates_object
  const someDate = '2017-11-07T22:56:10.962Z'
  const exampleLobResponse = {
    id: templateId,
    description: 'Test Template',
    versions: [
      {
        id: 'vrsn_362184d96d9b0c9',
        description: 'Test Template',
        html: '<html>HTML for {{name}}</html>',
        date_created: someDate,
        date_modified: someDate,
        object: 'version'
      }
    ],
    published_version: {
      id: 'vrsn_362184d96d9b0c9',
      description: 'Test Template',
      html: '<html>HTML for {{name}}</html>',
      date_created: someDate,
      date_modified: someDate,
      object: 'version'
    },
    metadata: {},
    date_created: someDate,
    date_modified: someDate,
    object: 'template'
  }

  // Define a test case with the description 'returns 200 status for an existing template'
  test('returns 200 status for an existing template', async () => {
    // Create a spy on axios.get method
    const spy = jest.spyOn(axios, 'get')

    // Mock the implementation of axios.get
    spy.mockImplementation((url) => {
      // If the URL does not match the expected URL, throw an error
      if (url !== `${LOB_API_HOST}/v1/templates/${templateId}`) {
        throw new Error('unexpected call to `axios.get`')
      }

      // If the URL matches, return a mock response with status 200 and some example data
      return {
        status: 200,
        data: exampleLobResponse
      }
    })

    // Make a GET request to the route using the request function and await the response
    const response = await request(app).get(route)

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the spy (axios.get) was called
    expect(spy).toHaveBeenCalled()

    // Restore the original (non-mocked) implementation of axios.get
    spy.mockRestore()
  })

  // Define the test
  test('returns 400 status for a non-existent template', async () => {
    // Define a non-existent template ID and the corresponding route
    const badTemplateId = 'non_existent_template_id'
    const badRoute = `/api/lob/templates/${badTemplateId}`

    // Create a spy on axios.get method
    const spy = jest.spyOn(axios, 'get')

    // Mock the implementation of axios.get
    spy.mockImplementation((url) => {
      // If the url is not the expected one, throw an error
      if (url !== `${LOB_API_HOST}/v1/templates/${badTemplateId}`) {
        throw new Error('unexpected call to `axios.get`')
      }

      // Define the error to be thrown when the template is not found
      const axiosError = new Error('Not Found')
      axiosError.response = {
        status: 404,
        data: {
          error: {
            message: 'template not found',
            status_code: 404,
            code: 'not_found'
          }
        }
      }

      // Throw the error
      throw axiosError
    })

    // Make a GET request to the bad route
    const response = await request(app).get(badRoute)

    // Check if the response status is 400
    expect(response.status).toBe(400)

    // Check if the error message in the response body is 'template not found'
    expect(response.body.error).toBe('template not found')

    // Check if the spy was called
    expect(spy).toHaveBeenCalled()

    // Restore the original implementation of axios.get
    spy.mockRestore()
  })
})

describe('POST /api/lob/addressVerification', () => {
  // For more information on these testing values, check the Lob API docs.
  // See: https://docs.lob.com/node#us-verification-test-environment

  const route = '/api/lob/addressVerification'
  const zip = '11111' // nonsense

  // Define a test case with the description 'returns 200 status for an address meeting all requirements'
  test('returns 200 status for an address meeting all requirements', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'residential house', zip })

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes a deliverable flag, a null warning, and a revisedAddress object
    expect(response.body).toEqual({
      deliverable: true,
      warning: null,
      revisedAddress: {
        line1: '1709 BRODERICK ST',
        line2: null,
        city: 'SAN FRANCISCO',
        state: 'CA',
        zip: '94115-2525'
      }
    })
  })

  //
  // Pre-request validation tests
  //

  // TODO

  //
  // Post-request validation tests
  //

  // Define a test case with the description 'returns 200 status for a residential house'
  test('returns 200 status for a residential house', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'residential house', zip })

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes a deliverable flag, a null warning, and a revisedAddress object
    expect(response.body).toEqual({
      deliverable: true,
      warning: null,
      revisedAddress: {
        line1: '1709 BRODERICK ST',
        line2: null,
        city: 'SAN FRANCISCO',
        state: 'CA',
        zip: '94115-2525'
      }
    })
  })

  // Define a test case with the description 'returns 200 status for residential highrise'
  test('returns 200 status for residential highrise', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'residential highrise', zip })

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes a deliverable flag, a null warning, and a revisedAddress object
    expect(response.body).toEqual({
      deliverable: true,
      revisedAddress: {
        city: 'SAN FRANCISCO',
        line1: '660 KING ST UNIT 305',
        line2: null,
        state: 'CA',
        zip: '94107-1539'
      },
      warning: null
    })
  })

  // Define a test case with the description 'returns 200 status for residential department of state'
  test('returns 200 status for residential department of state', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'department of state', zip })

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes a deliverable flag, a null warning, and a revisedAddress object
    expect(response.body).toEqual({
      deliverable: true,
      revisedAddress: {
        city: 'DPO',
        line1: 'UNIT 8900 BOX 4301',
        line2: null,
        state: 'AE',
        zip: '09831-4301'
      },
      warning: null
    })
  })

  // Define a test case with the description 'returns 200 status for residential military'
  test('returns 200 status for residential military', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'military', zip })

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes a deliverable flag, a null warning, and a revisedAddress object
    expect(response.body).toEqual({
      deliverable: true,
      revisedAddress: {
        city: 'APO',
        line1: 'CMR 409 BOX 145',
        line2: null,
        state: 'AE',
        zip: '09053-0002'
      },
      warning: null
    })
  })

  // Define a test case with the description 'returns 200 status with warning for residence with unnecessary unit'
  test('returns 200 status with warning for residence with unnecessary unit', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'unnecessary unit', zip })

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes a deliverable flag, a revisedAddress object, and a warning message
    expect(response.body).toEqual({
      deliverable: true,
      revisedAddress: {
        city: 'SAN FRANCISCO',
        line1: '1709 BRODERICK ST APT 505',
        line2: null,
        state: 'CA',
        zip: '94115-2525'
      },
      warning:
        'Address may be deliverable but contains an unnecessary suite number'
    })
  })

  // Define a test case with the description 'returns 400 status for residential post office box'
  test('returns 400 status for residential post office box', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'po box', zip })

    // Assert that the response status is 400
    expect(response.status).toBe(400)

    // Assert that the response body matches the expected object
    // The expected object includes an error message
    expect(response.body).toEqual({
      error: 'Post office boxes are not currently supported'
    })
  })

  // Define a test case with the description 'returns 400 status for residence in Puerto Rico'
  test('returns 400 status for residence in Puerto Rico', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'puerto rico', zip })

    // Assert that the response status is 400
    expect(response.status).toBe(400)

    // Assert that the response body matches the expected object
    // The expected object includes an error message
    expect(response.body).toEqual({
      error: 'Puerto Rico addresses are not currently supported'
    })
  })

  // Define a test case with the description 'returns 400 status for commercial building'
  test('returns 400 status for commercial building', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'deliverable', zip })

    // Assert that the response status is 400
    expect(response.status).toBe(400)

    // Assert that the response body matches the expected object
    // The expected object includes an error message
    expect(response.body).toEqual({
      error: 'Non-residential addresses are not currently supported'
    })
  })

  // Define a test case with the description 'returns 400 status for commercial highrise'
  test('returns 400 status for commercial highrise', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'commercial highrise', zip })

    // Assert that the response status is 400
    expect(response.status).toBe(400)

    // Assert that the response body matches the expected object
    // The expected object includes an error message
    expect(response.body).toEqual({
      error: 'Non-residential addresses are not currently supported'
    })
  })

  // Define a test case with the description 'returns 400 status for undeliverable address'
  test('returns 400 status for undeliverable address', async () => {
    // Make a POST request to the route with the request function, sending a payload with line1 and zip
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ line1: 'undeliverable block match', zip })

    // Assert that the response status is 400
    expect(response.status).toBe(400)

    // Assert that the response body matches the expected object
    // The expected object includes an error message
    expect(response.body).toEqual({ error: 'Address is undeliverable' })
  })
})

// Creating 'from' variable here to capture the address_id generated by the following /createAdress test
// for the /createLetter test. While it'd be preferable to not have tests depend on
// each other, this will ensure a consistently correct address_id and should the test address_id
// get deleted from our test instance, the test will still pass.
let from = { address_id: '' }
describe('POST /api/lob/createAddress', () => {
  // For more information on these testing values, check the Lob API docs.
  // See: https://docs.lob.com/node#us-verification-test-environment

  const route = '/api/lob/createAddress'

  // Define a test case with the description 'returns 200 status for an address meeting all requirements'
  test('returns 200 status for an address meeting all requirements', async () => {
    // Define an address object with all required properties
    const address = {
      description: 'Jane - Office',
      name: 'Jane Doe',
      email: 'jane@lob.com',
      company: 'Lob',
      line1: 'residential house',
      city: 'SAN FRANCISCO',
      state: 'CA',
      zip: '94115-2525'
    }

    // Make a POST request to the route with the request function, sending the address object as payload
    // Await the response
    const response = await request(app).post(route).send(address)

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes an address_id property of any string
    expect(response.body).toEqual({
      address_id: expect.any(String)
    })

    // Return the address_id from the response body and assign it to the 'address_id' property of the 'from' object
    return (from['address_id'] = response.body.address_id)
  })
})

describe('POST /api/lob/createLetter', () => {
  // For more information on these testing values, check the Lob API docs.
  // See: https://docs.lob.com/node#us-verification-test-environment

  const route = '/api/lob/createLetter'

  // Define a test case with the description 'returns 200 status if a letter is created meeting all requirements'
  // This test is currently skipped using test.skip
  test.skip('returns 200 status if a letter is created meeting all requirements', async () => {
    // Define a description for the test
    const description = 'This is a test description'

    // Define a 'to' object with all required properties
    const to = {
      description: 'Jane - Office',
      name: 'Jane Doe',
      email: 'jane@lob.com',
      company: 'Lob',
      line1: '1709 BRODERICK ST',
      city: 'SAN FRANCISCO',
      state: 'CA',
      zip: '94115-2525'
    }

    // Define a template_id for the test
    const template_id = 'tmpl_1057bb6f50f81fb'

    // Define a test checkout session id that should return status of 'succeeded'
    const sessionId =
      'cs_test_b1vdPbK35BuuANm2i4hd2BQqPcG7vymJRSRc4wMtQSprqiyYDBRgkN8Tn9'

    // Make a POST request to the route with the request function, sending a payload with description, to, from, template_id, and sessionId
    // Await the response
    const response = await request(app)
      .post(route)
      .send({ description, to, from, template_id, sessionId })

    // Assert that the response status is 200
    expect(response.status).toBe(200)

    // Assert that the response body matches the expected object
    // The expected object includes an expected_delivery_date property of any string
    expect(response.body).toEqual({
      expected_delivery_date: expect.any(String)
    })
  })
})
