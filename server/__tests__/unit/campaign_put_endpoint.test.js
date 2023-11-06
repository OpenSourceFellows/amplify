const request = require('supertest')
const app = require('../../app')

describe('PUT /api/v1/campaigns/:id', () => {
  it('should return 200 if successfully updated the campaign', async () => {
    const response = await request(app)
      .put('/api/v1/campaigns/5')
      .send({
        campaign: {
          type: 'Grant'
        }
      })
    expect(response.status).toBe(200)
  })

  it('should return 404 if no campaign is found', async () => {
    const response = await request(app)
      .put('/api/v1/campaigns/999999')
      .send({ campaign: { type: 'Accelerator' } })

    expect(response.status).toBe(404)
    expect(response.body.msg).toBe('Campaign not found')
  })

  it('should return 500 for invalid update', async () => {
    const response = await request(app)
      .put('/api/v1/campaigns/5')
      .send({
        campaign: {
          type: 'random'
        }
      })

    expect(response.status).toBe(500)
  })
})
