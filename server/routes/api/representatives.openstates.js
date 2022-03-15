require('dotenv').config()

const express = require('express')
const axios = require('axios')
const qs = require('qs')

const router = express.Router()

const { GEOCODING_API_KEY, OPEN_STATES_API_KEY } = process.env

// Endpoints

// Get
router.get('/:zipCode', async (req, res) => {
  const { zipCode } = req.params

  if (!zipCode.match(/^\d{5}(-\d{4})?$/)) {
    res.status(400).send({
      error:
        'Invalid zip code format, valid examples are 84054-6013 or 84054. The zip code used was ' +
        zipCode
    })
    return
  }

  try {
    const {
      data: { response: geocodingResponse }
    } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        components: `country:US|postal_code:${zipCode}`,
        key: GEOCODING_API_KEY
      }
    })

    const { results: geocodingResults } = geocodingResponse
    const geoLocation =
      geocodingResults &&
      geocodingResults[0] &&
      geocodingResults[0].geometry &&
      geocodingResults[0].geometry.location
    const { lat: latitude, lng: longitude } = geoLocation || {}

    if (!Number.isNumber(latitude) || !Number.isNumber(longitude)) {
      res.status(400).send({
        error: 'Invalid location. The zip code used was ' + zipCode
      })
      return
    }

    const {
      data: { results: officials }
    } = await axios.get('https://v3.openstates.org/people.geo', {
      params: {
        lat: latitude,
        lng: longitude,
        include: ['other_identifiers', 'links', 'offices'],
        key: OPEN_STATES_API_KEY
      },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat' })
    })

    if (!officials || !Array.isArray(officials) || officials.length === 0) {
      throw new Error('No matches found for the search criteria')
    }

    const representatives = officials.map((rep) => {
      const mainAddr = (Array.isArray(rep.offices) && rep.offices[0]) || {}

      const repInfo = {
        id: rep.id || '',
        name: rep.name,
        title: rep.current_role.title || '',
        address_line1: mainAddr.address || '', // WARNING: These are inconsistently formatted and need to be normalized
        address_line2: '',
        address_city: '',
        address_state: '',
        address_zip: '',
        address_country: 'US',
        email: rep.email || 'Not Made Public',
        twitter:
          (rep.other_identifiers.find((id) => id.scheme === 'twitter') || {})
            .identifier || 'Not Made Public',
        facebook:
          (rep.other_identifiers.find((id) => id.scheme === 'facebook') || {})
            .identifier || 'Not Made Public',
        contactPage:
          ((Array.isArray(rep.links) && rep.links[0]) || {}).url || '',
        photoUrl:
          rep.image ||
          'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
      }

      return repInfo
    })

    res.send(representatives)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Whoops' })
  }
})

module.exports = router
