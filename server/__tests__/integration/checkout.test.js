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
