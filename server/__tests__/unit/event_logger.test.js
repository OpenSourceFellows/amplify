require('dotenv').config()
const ErrorLog = require('../../db/models/error_log')
const supertest = require('supertest')
const app = require('../../app')

// Mock the ErrorLog model
jest.mock('../../db/models/error_log', () => {
  let resQuery = jest.fn()
  let resInsert = jest.fn()
  let res = {
    query: resQuery,
    insert: resInsert
  }
  // in order to chain class methods, this is required
  resQuery.mockImplementation(() => res)
  resInsert.mockImplementation(() => res)

  return res
})

beforeAll(() => {
  jest.clearAllMocks()
})

describe('Saving a log message to db', () => {
  test('should call ErrorLog.query().insert()', async () => {
    const route = '/api/event_logger/log'

    // Call a function that should call ErrorLog.query().insert()
    const response = await supertest(app)
      .post(route)
      .send({ severity: 'foo', data: 'bar' })
    expect(response.status).toBe(200)

    expect(ErrorLog.query).toHaveBeenCalledTimes(1)
    expect(ErrorLog.insert).toHaveBeenCalledWith({
      level: 'foo',
      data: JSON.stringify('bar')
    })
  })
})
