require('dotenv').config()

const express = require('express')
const axios = require('axios')

const router = express.Router()

const CIVIC_API_KEY = getCivicApiKey()

// Endpoints

// Get
router.get('/:zipCode', async (req, res) => {
  const congressMembers = []
  const { zipCode } = req.params

  if (!zipCode.match(/^\d{5}(-\d{4})?$/)) {
    res.status(400).send({
      error:
        'Invalid zip code format, valid examples are 84054-6013 or 84054. The zipcode used was ' +
        zipCode
    })
    return
  }
  try {
    const response = await axios.get(
      'https://www.googleapis.com/civicinfo/v2/representatives',
      {
        params: {
          key: CIVIC_API_KEY,
          address: zipCode
        }
      }
    )

    const { offices, officials } = response.data
    offices
      .slice(2) // skip President and VP
      .forEach((officeType) => {
        officeType.officialIndices.forEach((position) => {
          const rep = officials[position]
          const repInfo = {
            name: rep.name || '',
            title: officeType.name || '',
            address_line1: '',
            address_line2: '',
            address_city: '',
            address_state: '',
            address_zip: '',
            address_country: 'US',
            email:
              (Array.isArray(rep.emails) && rep.emails[0]) || 'Not Made Public',
            twitter: 'Not Made Public',
            facebook: 'Not Made Public',
            contactPage: (Array.isArray(rep.urls) && rep.urls[0]) || '',
            photoUrl:
              rep.photoUrl ||
              'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
          }

          if (Array.isArray(rep.address) && rep.address[0]) {
            repInfo.address_line1 = rep.address[0].line1
            repInfo.address_city = rep.address[0].city
            repInfo.address_state = rep.address[0].state
            repInfo.address_zip = rep.address[0].zip
          }

          if (Array.isArray(rep.channels) && rep.channels.length > 0) {
            const facebook = rep.channels.find(
              ({ type }) => type === 'Facebook'
            )
            if (facebook) {
              repInfo.facebook = facebook.id
            }
            const twitter = rep.channels.find(({ type }) => type === 'Twitter')
            if (twitter) {
              repInfo.twitter = twitter.id
            }
          }
          congressMembers.push(repInfo)
        })
      })

    res.send(congressMembers)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

module.exports = router

// Temporary implementation for fallback with deprecation warnings
function getCivicApiKey() {
  const { CIVIC_API_KEY, CivicAPI } = process.env
  const civicApiKey = CIVIC_API_KEY || CivicAPI

  if (CivicAPI) {
    if (CIVIC_API_KEY) {
      console.warn('Using "CIVIC_API_KEY" environment variable.')
      console.warn(
        'Please remove your deprecated "CivicAPI" environment variable!'
      )
    } else {
      console.warn(
        'Expected "CIVIC_API_KEY" environment variable was not found.'
      )
      console.warn(
        'Falling back to deprecated "CivicAPI" environment variable....'
      )
      console.warn('Please update your environment to use the expected key!')
    }
  }

  return civicApiKey
}
