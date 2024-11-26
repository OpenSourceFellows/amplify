const request = require('supertest')
const express = require('express')
const ciceroMockApi = require('../../routes/api/ciceroMockApi')

const app = express()
app.use('/mock-representatives', ciceroMockApi)

describe('Test /mock-representatives route', () => {
  test('It should respond with a 200 status and an array of representatives', async () => {
    const response = await request(app).get('/mock-representatives/1003')
    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    expect(response.body.length).toBeGreaterThan(0)
  })

  test('Each representative should have an id property', async () => {
    const response = await request(app).get('/mock-representatives/1003')
    const representative = response.body[0]
    expect(representative).toHaveProperty('id')
  })

  test('Each representative should have a name property', async () => {
    const response = await request(app).get('/mock-representatives/1003')
    const representative = response.body[0]
    expect(representative).toHaveProperty('name')
  })

  test('Each representative should have a title property', async () => {
    const response = await request(app).get('/mock-representatives/1003')
    const representative = response.body[0]
    expect(representative).toHaveProperty('title')
  })
})

describe('Test /mock-representatives route error handling', () => {
  test('It should respond with a 404 status for bad requests', async () => {
    // Simulate a bad request by omitting required parameters
    const response = await request(app).get('/mock-representatives')

    // Expect a 404 status code in response
    expect(response.statusCode).toBe(404)
  })
})
