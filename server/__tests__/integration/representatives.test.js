require('dotenv').config()
const request = require('supertest')
const axios = require('axios')
const express = require('express')
const apiRouter = require('../../api')

// Create a test application
const app = express()
app.use('/api', apiRouter)

const CICERO_API_HOST = 'https://cicero.azavea.com/v3.1/official'

afterEach(() => {
  jest.clearAllMocks()
})

afterAll(async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 500)) // avoid jest open handle error
})
describe('GET api/representatives/:zipcode', () => {
  const zipcode = '20510-1234'
  const route = `/api/representatives/${zipcode}`

  const exampleZipResponse = {
    id: '',
    name: 'Maria Cantwell',
    title: 'U.S. Senator',
    address_line1: '511 Hart Senate Office Building',
    address_line2: '',
    address_city: 'Washington',
    address_state: 'DC',
    address_zip: zipcode,
    address_country: 'US',
    email: 'Not Made Public',
    contactPage: '',
    photoUrl:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
    socialMediaPages: 'SenatorCantwell',
    photoCroppingCSS: 'center center'
  }

  test('returns 200 status for a a successful mock enpoint', async () => {
    const spy = jest.spyOn(axios, 'get')
    spy.mockImplementation((url) => {
      if (
        url === `${CICERO_API_HOST}/api/representatives/${zipcode.slice(0, 5)}`
      ) {
        return {
          status: 200,

          data: { exampleZipResponse }
        }
      }
    })
    const response = await request(app).get(route)
    expect(response.status).toBe(200)

    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
  //  test('returns 200 status for a a successful mock enpoint', async () => {
  //     const spy = jest.spyOn(axios, 'get')
  //     spy.mockImplementation((url) => {
  //       if (url === `/api/representatives/${zipcode}`) {
  //         return {
  //         status: 200,
  //         data: exampleZipResponse
  //       }
  //       }
  //     })
  //     const response = await request(app).get(route)
  //     expect(response.status).toBe(200)

  //     expect(spy).toHaveBeenCalled()
  //     spy.mockRestore()
  //   })
  //  test('returns 200 status for a failed mock enpoint', async () => {
  //     const spy = jest.spyOn(axios, 'get')
  //     spy.mockImplementation((url) => {
  //       if (url !== `/api/representatives/${zipcode}`) {
  //         throw new Error(`Invalid zip code format, valid examples are 84054-6013 or 84054. The zipcode used was ${zipcode}` )
  //       }
  //       return {
  //         status: 400,
  //       }
  //     })

  //     const response = await request(app).get(route)
  //     expect(response.status).toBe(400)

  //     expect(spy).toHaveBeenCalled()
  //     spy.mockRestore()
  //   })
})
