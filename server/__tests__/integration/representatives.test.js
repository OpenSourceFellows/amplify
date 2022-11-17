require('dotenv').config()
const request = require('supertest')
const axios = require('axios')
const express = require('express')
const apiRouter = require('../../api')

// Create a test application
const app = express()
app.use('/api', apiRouter)
const { CICERO_API_KEY } = process.env
const CICERO_API_HOST = 'https://cicero.azavea.com/v3.1/official'
const zipCode = '84054'
afterEach(() => {
  jest.clearAllMocks()
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})

jest.mock('axios')
axios.get.mockResolvedValue({
  data: {
    response: {
      results: [
        {
          mockCiceroResponse: {
            results: {
              candidates: [
                {
                  count: { from: 0, to: 37, total: 38 },
                  officials: [],
                  locator: 'World',
                  score: 100,
                  match_addr: ` ${zipCode}, Philadelphia, Pennsylvania`,
                  x: -75.15263499999998,
                  y: 39.93611000000004,
                  wkid: 4326,
                  locator_type: 'Postal',
                  geoservice: 'EsriWGS',
                  match_city: 'Philadelphia',
                  match_subregion: 'Philadelphia County',
                  match_region: 'PA',
                  match_postal: zipCode,
                  match_country: 'US',
                  match_streetaddr: ''
                }
              ]
            }
          },
          params: {
            search_postal: zipCode,
            search_country: 'US',
            order: 'district_type',
            sort: 'asc',
            max: 200,
            format: 'json',
            key: process.env.CICERO_API_KEY
          }
        }
      ]
    }
  }
})
//mock axios get request to cicero api to return a valid response with a single representative object in the response

describe('GET /api/representatives/:zipCode', () => {
  //test that the api returns a 200 status code and a single representative object in the response
  it('should return a 200 status code and a single representative object in the response', async () => {
    const response = await request(app).get('/api/representatives/84054')
    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      response: [
        {
          mockCiceroResponse: {
            results: {
              candidates: [
                {
                  count: { from: 0, to: 37, total: 38 },
                  officials: [],
                  locator: 'World',
                  score: 100,
                  match_addr: ` ${zipCode}, Philadelphia, Pennsylvania`,
                  x: -75.15263499999998,
                  y: 39.93611000000004,
                  wkid: 4326,
                  locator_type: 'Postal',
                  geoservice: 'EsriWGS',
                  match_city: 'Philadelphia',
                  match_subregion: 'Philadelphia County',
                  match_region: 'PA',
                  match_postal: zipCode,
                  match_country: 'US',
                  match_streetaddr: ''
                }
              ]
            }
          },
          params: {
            search_postal: zipCode,
            search_country: 'US',
            order: 'district_type',
            sort: 'asc',
            max: 200,
            format: 'json',
            key: process.env.CICERO_API_KEY
          }
        }
      ]
    })
  })
})

test('returns 200 status for a a successful mock endpoint', async () => {
  const spy = jest.spyOn(axios, 'get')
  spy.mockImplementation(
    (
      url,
      params = {
        search_postal: zipCode,
        search_country: 'US',
        order: 'district_type',
        sort: 'asc',
        max: 200,
        format: 'json',
        key: process.env.CICERO_API_KEY
      }
    ) => {
      if (
        url ===
        `${CICERO_API_HOST}?search_postal=${zipCode.slice(
          0,
          5
        )}&search_country=US&order=district_type&sort=asc&max=200&format=json&key=${CICERO_API_KEY}`
      ) {
        return Promise.resolve({
          data: {
            response: [
              {
                mockCiceroResponse: {
                  results: {
                    candidates: [
                      {
                        count: { from: 0, to: 37, total: 38 },
                        officials: [],
                        locator: 'World',
                        score: 100,
                        match_addr: ` ${zipCode}, Philadelphia, Pennsylvania`,
                        x: -75.15263499999998,
                        y: 39.93611000000004,
                        wkid: 4326,
                        locator_type: 'Postal',
                        geoservice: 'EsriWGS',
                        match_city: 'Philadelphia',
                        match_subregion: 'Philadelphia County',
                        match_region: 'PA',
                        match_postal: zipCode,
                        match_country: 'US',
                        match_streetaddr: ''
                      }
                    ]
                  }
                },
                params
              }
            ]
          }
        })
      }
    }
    //mocks the axios.get call to return a successful response with a single representative object in the response body
  )
  const response = await request(app).get('/api/representatives/84054')
  expect(response.status).toBe(200)
  expect(response.body).toEqual({
    response: [
      {
        mockCiceroResponse: {
          results: {
            candidates: [
              {
                count: { from: 0, to: 37, total: 38 },
                officials: [],
                locator: 'World',
                score: 100,
                match_addr: ` ${zipCode}, Philadelphia, Pennsylvania`,
                x: -75.15263499999998,
                y: 39.93611000000004,
                wkid: 4326,
                locator_type: 'Postal',
                geoservice: 'EsriWGS',
                match_city: 'Philadelphia',
                match_subregion: 'Philadelphia County',
                match_region: 'PA',
                match_postal: zipCode,
                match_country: 'US',
                match_streetaddr: ''
              }
            ]
          }
        },
        params: {
          search_postal: zipCode,
          search_country: 'US',
          order: 'district_type',
          sort: 'asc',
          max: 200,
          format: 'json',
          key: process.env.CICERO_API_KEY
        }
      }
    ]
  })
  expect(spy).toHaveBeenCalled()
  spy.mockRestore()
})
