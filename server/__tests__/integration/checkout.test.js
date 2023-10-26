/* eslint-disable no-unused-vars */

require('dotenv').config()
const request = require('supertest')
const express = require('express')
const apiRouter = require('../../api')

// Create a test application
const app = express()
app.use('/api', apiRouter) // Mount the API router under the '/api' route

// Clear all Jest mocks after each test
afterEach(() => {
  jest.clearAllMocks()
})

// Define a test suite for the 'GET /api/...' endpoint
describe('GET /api/...', () => {
  // Define a test case that will be currently skipped
  test.skip('fake test', async () => {
    expect(true).toBe(true) // placeholder test that expects true to be true (currently skipped)
  })
})

// Wait for 500 milliseconds after all tests have completed
afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid Jest open handle error
})
