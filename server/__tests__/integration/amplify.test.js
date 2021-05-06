require('dotenv').config()
const app = require('../../app')
const request = require('supertest')

afterEach(() => {
    jest.clearAllMocks()
})

afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})

describe('/api/amplify/:zipcode', () => {
    const zipcode = '92107'
    const route = '/api/amplify/' + zipcode
    test('returns 200 status', async () => {
        const response = await request(app).get(route)
        expect(response.status).toBe(200)
    })
})

describe('/api/amplify/', () => {
    const route = '/api/amplify/'
    test('returns 200 status', async () => {
        const response = await request(app).get(route)
        expect(response.status).toBe(200)
    })
})
