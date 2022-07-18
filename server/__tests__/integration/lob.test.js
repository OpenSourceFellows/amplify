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

  test('returns 200 status for an existing template', async () => {
    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementation((url) => {
      if (url !== `${LOB_API_HOST}/v1/templates/${templateId}`) {
        throw new Error('unexpected call to `axios.get`')
      }
      return {
        status: 200,
        data: exampleLobResponse
      }
    })

    const response = await request(app).get(route)
    expect(response.status).toBe(200)

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  test('returns 400 status for a non-existent template', async () => {
    const badTemplateId = 'non_existent_template_id'
    const badRoute = `/api/lob/templates/${badTemplateId}`

    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementation((url) => {
      if (url !== `${LOB_API_HOST}/v1/templates/${badTemplateId}`) {
        throw new Error('unexpected call to `axios.get`')
      }

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
      throw axiosError
    })

    const response = await request(app).get(badRoute)
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('template not found')

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})

describe('POST /api/lob/addressVerification', () => {
  // For more information on these testing values, check the Lob API docs.
  // See: https://docs.lob.com/node#us-verification-test-environment

  const route = '/api/lob/addressVerification'
  const zip = '11111' // nonsense

  test('returns 200 status for an address meeting all requirements', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'residential house', zip })
    expect(response.status).toBe(200)
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

  test('returns 200 status for a residential house', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'residential house', zip })
    expect(response.status).toBe(200)
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

  test('returns 200 status for residential highrise', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'residential highrise', zip })
    expect(response.status).toBe(200)
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

  test('returns 200 status for residential department of state', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'department of state', zip })
    expect(response.status).toBe(200)
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

  test('returns 200 status for residential military', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'military', zip })
    expect(response.status).toBe(200)
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

  test('returns 200 status with warning for residence with unnecessary unit', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'unnecessary unit', zip })
    expect(response.status).toBe(200)
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

  test('returns 400 status for residential post office box', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'po box', zip })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Post office boxes are not currently supported'
    })
  })

  test('returns 400 status for residence in Puerto Rico', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'puerto rico', zip })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Puerto Rico addresses are not currently supported'
    })
  })

  test('returns 400 status for commercial building', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'deliverable', zip })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Non-residential addresses are not currently supported'
    })
  })

  test('returns 400 status for commercial highrise', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'commercial highrise', zip })
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Non-residential addresses are not currently supported'
    })
  })

  test('returns 400 status for undeliverable address', async () => {
    const response = await request(app)
      .post(route)
      .send({ line1: 'undeliverable block match', zip })
    expect(response.status).toBe(400)
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

  test('returns 200 status for an address meeting all requirements', async () => {
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

    const response = await request(app).post(route).send(address)
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      address_id: expect.any(String)
    })
    return (from['address_id'] = response.body.address_id)
  })
})

describe('POST /api/lob/createLetter', () => {
  // For more information on these testing values, check the Lob API docs.
  // See: https://docs.lob.com/node#us-verification-test-environment

  const route = '/api/lob/createLetter'

  test('returns 200 status if a letter is created meeting all requirements', async () => {
    const description = 'This is a test description'

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

    const template_id = 'tmpl_1057bb6f50f81fb'

    // A test payment intent that should return status of 'succeeded'
    const paymentIntentId = 'pi_3L7VXGFqipIA40A31qbflVvO'

    const response = await request(app)
      .post(route)
      .send({ description, to, from, template_id, paymentIntentId })
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      expected_delivery_date: expect.any(String)
    })
  })
})
