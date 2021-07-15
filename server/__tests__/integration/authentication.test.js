require('dotenv').config()
const app = require('../../app')
const request = require('supertest')

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})

describe('/api/authentication/isAuthenticated', () => {
  test('returns false if user is not currently authenticated', async () => {
    const route = '/api/authentication/isAuthenticated'
    const authStatus = await request(app).get(route)
    expect(authStatus.body).toBe(false)
  })
})
