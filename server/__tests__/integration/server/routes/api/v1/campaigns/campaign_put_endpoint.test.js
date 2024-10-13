const request = require('supertest')
const app = require('../../../../../../../app')
const Campaign = require('../../../../../../../db/models/campaign')

jest.mock('../../../../../../../db/models/campaign')

describe('PUT /api/v1/campaigns/:id', () => {
  it('should return 200 if successfully updated the campaign', async () => {
    const campaignData = {
      id: 5,
      name: "Sogorea 'Te Land Trust",
      organization: "Sogorea 'Te Land Trust",
      page_url: 'https://sogoreate-landtrust.org/',
      cause: 'Civic Rights',
      type: 'Grant'
    }
    // Mock patchAndFetchById to return a resolved promise
    Campaign.query.mockReturnValue({
      patchAndFetchById: jest.fn().mockResolvedValue(campaignData)
    })
    const response = await request(app).put('/api/v1/campaigns/5').send({
      campaign: campaignData
    })
    expect(response.status).toBe(200)
    expect(response.body.campaign).toEqual(campaignData)
  })

  it('should return 400 if no campaign is found', async () => {
    // Mock patchAndFetchById to return undefined
    Campaign.query.mockReturnValue({
      patchAndFetchById: jest.fn().mockResolvedValue(undefined)
    })
    const response = await request(app)
      .put('/api/v1/campaigns/999999')
      .send({ campaign: { type: 'Accelerator' } })

    expect(response.status).toBe(404)
    expect(response.body.msg).toBe('Campaign not found')
  })

  it('should return 500 for invalid update', async () => {
    // Mock patchAndFetchById to throw an error
    Campaign.query.mockReturnValue({
      patchAndFetchById: jest.fn().mockRejectedValue(new Error('Server error'))
    })
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
