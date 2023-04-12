/* eslint-disable no-unused-vars */
require('dotenv').config()
const request = require('supertest')
const axios = require('axios')
const express = require('express')
const apiRouter = require('../../api')
const apiResponse = require('../../apiResponse')
const ciceroResponse = require('../../ciceroResponse')

// Create a test application
/* Setting up the environment for the test. */

// Create a test application and get the application id and secret key for the test application from the test application page.
const app = express()
app.use('/api', apiRouter)
//'https://cicero.azavea.com/v3.1/official'
const zipCode = '84054-6013'

afterEach(() => {
  jest.clearAllMocks()
})

// Mock the axios request to the Cicero API and return the mock data for the test.
afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})

// Mock the axios request to the Cicero API and return the mock data for the test.
jest.mock('axios')

// Mock the axios request to the Cicero API and return the mock data for the test.
describe('GET /api/representatives/:zipCode', () => {
  //test that the api returns a 200 status code and a single representative object in the response
  it('should return a 200 status code and a single representative object in the response', async () => {
    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementation(async (url, { params }) => {
      return {
        data: ciceroResponse
      }
    })
    // Make a request to the API with half of the zipCode
    const response = await request(app).get(
      `/api/representatives/${zipCode.slice(0, 5)}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toEqual(apiResponse)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  }, 50000)
})

// Mock the axios request to the Cicero API and return the mock data for the test.
describe('GET /api/representatives/:zipCode', () => {
  //test that the api returns a 200 status code and a single representative object in the response
  it('should return a 200 status code and a single representative object in the response', async () => {
    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementation(async (url, { params }) => {
      return {
        data: ciceroResponse
      }
    })
    // Make a request to the API
    const response = await request(app).get(`/api/representatives/${zipCode}`)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(apiResponse)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  }, 50000)
})

// mock implementation with an invalid zip code which return 400 status code
it('should return a 400 status code and an error message in the response', async () => {
  const spy = jest.spyOn(axios, 'get')
  const invalidZip = 'someInvalidZip'
  // Make a request to the API
  const response = await request(app).get(`/api/representatives/${invalidZip}`)
  expect(response.status).toBe(400)
  expect(response.body).toEqual({
    error: `Invalid zip code or street address format, valid examples of a ZIP code are 84054-6013 or 84054. The zipcode/street address used was ${invalidZip}`
  })
  spy.mockRestore()
}, 50000)

// //mock test that gives a 500 status code and an error message in the response when the cicero api is down or not responding to the request from the application server
// it('should return a 500 status code and an error message in the response when the cicero api is down or not responding to the request from the application server', async () => {
//   const spy = jest.spyOn(axios, 'get')
//   spy.mockImplementation(async (url, { params }) => {
//     return {
//       data: ciceroResponse
//     }
//   })
//   // Make a request to the API
//   const response = await request(app).get(`/api/representatives/${zipCode}`)
//   expect(response.status).toBe(500)
//   expect(response.body).toEqual({
//     error: 'Internal server error'
//   })
//   spy.mockRestore()
// })
