// below are where the tests for the campaign endpoints will go, I kept getting errors back and couldnt set this up correctly 😞, i got thrown off by the section about inserting test data into the database

// const request = require('supertest')
// const app = require('../../app')
// const Campaign = require('../../db/models/campaign')

// describe('v1Campaigns', () => {
//     beforeEach(async () => {
//       // Insert test data into the database
//       await Campaign.query().insert([
//         { name: 'The Breathe Act', organization: 'M4BL', page_url: "breatheact.org", cause: "Civic Rights", type: "Grant" },
//         // { name: 'Campaign 2', description: 'Description 2' },
//         // { name: 'Campaign 3', description: 'Description 3' },
//       ])
//     })
  
//     afterEach(async () => {
//       // Delete test data from the database
//       await Campaign.query().delete()
//     })
  
//     describe('GET /v1/campaigns/:id', () => {
//       test('returns a campaign by ID', async () => {
//         const campaign = await Campaign.query().first()
//         const response = await request(app).get(`/v1/campaigns/${campaign.id}`)
//         expect(response.status).toBe(200)
//         expect(response.body).toEqual(campaign)
//       })
  
//       test('returns a 404 error for non-existent campaign', async () => {
//         const response = await request(app).get('/v1/campaigns/999')
//         expect(response.status).toBe(404)
//         expect(response.text).toBe('Campaign not found')
//       })
//     })
// })