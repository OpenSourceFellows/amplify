// server/__tests__/api/campaigns.test.js
const request = require('supertest')
const app = require('../../app')
const Campaign = require('../../db/models/campaign')

jest.mock('../../db/models/campaign', () => {
  return {
    query: jest.fn().mockReturnThis(),
    findById: jest.fn().mockResolvedValue({ id: 1, name: 'Campaign 1' }),
    deleteById: jest.fn().mockResolvedValue(true)
  }
})

describe('DELETE /api/v1/campaigns/:id', () => {
  test('should delete a campaign and return a success message', async () => {
    const response = await request(app).delete('/api/v1/campaigns/1')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Campaign deleted successfully' })
  })

  test('should return a 500 status code and an error message if an error occurs', async () => {
    Campaign.query().deleteById.mockRejectedValue(
      new Error('Internal server error')
    )
    try {
      const response = await request(app).delete('/api/v1/campaigns/1')

      expect(response.status).toBe(500)
    } catch (error) {
      expect(error.response.status).toBe(500)
      expect(error.response.body).toEqual({ error: 'Internal server error' })
    }
  })
})
