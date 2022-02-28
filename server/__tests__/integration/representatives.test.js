require('dotenv').config()
const request = require('supertest')
const express = require('express')
const apiRouter = require('../../api')

// Create a test application
const app = express()
app.use('/api', apiRouter)

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})

describe('/api/representatives/:zipcode', () => {
  test('returns 200 status', async () => {
    const response = await request(app).get('/api/representatives/92107')
    expect(response.status).toBe(200)
  })
  test('returns 200 status', async () => {
    const response = await request(app).get('/api/representatives/92107-1234')
    expect(response.status).toBe(200)
  })
  test('returns 400 status', async () => {
    const response = await request(app).get('/api/representatives/cat')
    expect(response.status).toBe(400)
  })
})
