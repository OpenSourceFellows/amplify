const ErrorLog = require('../../db/models/error_log')
const request = require('supertest')
const express = require('express')
const apiRouter = require('../../api')

// Create a test application
const app = express()
app.use('/api', apiRouter)
  
describe('Saving a log message to db', () => {
    test('should call ErrorLog.query().insert()', async () => {
      // Create mock functions for ErrorLog.query().insert()
      const queryMock = jest.spyOn(ErrorLog, 'query');
      const insertMock = jest.spyOn(ErrorLog.prototype, '$query').mockReturnValue({
        insert: jest.fn(),
      });
  
      const route = '/api/event_logger/log'
      
      // Call a function that should call ErrorLog.query().insert()
      const response = await request(app)
        .post(route)
        .send({severity: 'foo', data: 'bar'})
      expect(response.status).toBe(200)
  
      // Assert that ErrorLog.query() and ErrorLog.insert() have been called
      expect(queryMock).toHaveBeenCalled();
      expect(insertMock.mock.results[0].value.insert).toHaveBeenCalledWith({ 
        level: 'foo', data: 'bar' 
      });
  
      // Restore the original functions
      queryMock.mockRestore();
      insertMock.mockRestore();
    });
  });