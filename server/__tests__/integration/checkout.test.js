/* eslint-disable no-unused-vars */

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

// Describe the test suite for the GET /api/... endpoint
describe('GET /api/...', () => {
  // Skip this fake test for now
  test.skip('fake test', async () => {
    // Expect true to be true
    expect(true).toBe(true)
  })
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})
