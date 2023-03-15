const request = require('supertest')
const express = require('express')
const apiRouter = require('../../api')

// Create a test application
const app = express()
app.use('/api', apiRouter)

describe('Saving a log message to db', () => {
  test('should call ErrorLog.query().insert()', async () => {
    // Create a mock ErrorLog model
    const { ErrorLog } = require('../../db/models/error_log')
    jest.mock('../../db/models/error_log', () => ({
      ErrorLog: class MockedErrorLog {}
    }))

    const route = '/api/event_logger/log'

    // Call a function that should call ErrorLog.query().insert()
    const response = await request(app)
      .post(route)
      .send({ severity: 'foo', data: 'bar' })
    expect(response.status).toBe(200)

    // Assert that ErrorLog.query() and ErrorLog.insert() have been called
    expect(ErrorLog.prototype.$query).toHaveBeenCalled()
    expect(ErrorLog.prototype.$query().insert).toHaveBeenCalledWith({
      level: 'foo',
      data: 'bar'
    })

    // Restore the original ErrorLog model
    jest.unmock('../../db/models/error_log')
  })
})
