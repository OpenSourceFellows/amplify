require('dotenv').config()
const app = require('../../app')
const request = require('supertest')
const axios = require('axios')

const LOB_API_HOST = 'https://api.lob.com'
const LOB_TEST_KEY_PREFIX = 'test_'

// Ensure we are using a testing key for the Lob API.
// Many of the tests will fail if using a live key instead.
beforeAll(() => {
    const { LOB_API_KEY, TEST_LOB_API_KEY } = process.env
    let lobApiKey = LOB_API_KEY || ''

    // Lob API keys starts with either "live_" (production) or "test_" (testing)
    if (!lobApiKey.startsWith(LOB_TEST_KEY_PREFIX) && (TEST_LOB_API_KEY || '').startsWith(LOB_TEST_KEY_PREFIX)) {
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

    test('temporarily supports deprecated route /api/lob/:templateId', async () => {
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

        const deprecatedRoute = `/api/lob/${templateId}`
        const response = await request(app).get(deprecatedRoute)
        expect(response.status).toBe(200)

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

    // Pre-request validation tests

    // Post-request validation tests

})
