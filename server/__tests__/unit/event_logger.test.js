const ErrorLog = require('../../db/models/error_log')
const request = require('supertest')
const app = require('../../app')
const logger = require('../../utilities/winston_logger')

const logMessage = { severity: 'foo', data: 'bar' }
const route = '/api/event_logger/log'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('sending a log message to Winston', () => {
  test('calls logger.info with the correct parameters', async () => {
    const spy = jest.spyOn(logger, 'info')

    // call a function that should call logger.info()
    const response = await request(app).post(route).send(logMessage)
    expect(response.status).toBe(200)

    expect(spy).toHaveBeenCalledWith(JSON.stringify(logMessage))

    // restore the original logger.info method
    spy.mockRestore()
  })
})

// mock the ErrorLog model
jest.mock('../../db/models/error_log', () => {
  let elQuery = jest.fn()
  let elInsert = jest.fn()
  let mockErrorLog = {
    query: elQuery,
    insert: elInsert
  }
  // in order to chain class methods, we return the class that called the method
  elQuery.mockImplementation(() => mockErrorLog)
  elInsert.mockImplementation(() => mockErrorLog)

  return mockErrorLog
})

describe('Saving a log message to the database', () => {
  test('should call ErrorLog.query().insert()', async () => {
    // call a function that should call ErrorLog.query().insert()
    await request(app).post(route).send(logMessage)

    expect(ErrorLog.query).toHaveBeenCalledTimes(1)
    expect(ErrorLog.insert).toHaveBeenCalledWith({
      level: logMessage.severity,
      data: JSON.stringify(logMessage.data)
    })
  })
})
