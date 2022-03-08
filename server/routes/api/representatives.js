require('dotenv').config()

const express = require('express')
const axios = require('axios')

const router = express.Router()

const { CICERO_API_KEY } = process.env

// Endpoints

// Get
router.get('/:zipCode', async (req, res) => {
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
    const {
      data: { response }
    } = await axios.get('https://cicero.azavea.com/v3.1/official', {
      params: {
        search_postal: zipCode,
        search_country: 'US',
        order: 'district_type', // https://cicero.azavea.com/docs/#order-by-district-type
        max: 200,
        format: 'json',
        key: CICERO_API_KEY
      }
    })

    const { errors, results } = response
    if (errors.length > 0) {
      throw new Error(errors.join(','))
    }
    if (
      !results ||
      !Array.isArray(results.candidates) ||
      results.candidates.length === 0
    ) {
      throw new Error('No matches found for the search criteria')
    }

    const officials = results.candidates[0].officials || []

    const representatives = officials
      .filter((rep) => {
        // skip President and VP
        return !(
          rep.office.district.ocd_id === 'ocd-division/country:us' &&
          /^(Vice )?President$/.test(rep.office.title)
        )
      })
      .map((rep) => {
        const mainAddr =
          (Array.isArray(rep.addresses) && rep.addresses[0]) || {}

        const repInfo = {
          id: rep.sk || rep.id || '',
          name: formatName(rep),
          title:
            rep.office.title ||
            rep.office.chamber.name_formal ||
            rep.office.chamber.name ||
            '',
          address_line1: mainAddr.address_1 || '',
          address_line2:
            mainAddr.address_2 +
              (mainAddr.address_3 ? ', ' + mainAddr.address_3 : '') || '',
          address_city: mainAddr.city || '',
          address_state: mainAddr.state || '',
          address_zip: mainAddr.postal_code || '',
          address_country: 'US',
          email:
            (Array.isArray(rep.email_addresses) && rep.email_addresses[0]) ||
            'Not Made Public',
          twitter:
            (
              rep.identifiers.find((id) => id.identifier_type === 'TWITTER') ||
              {}
            ).identifier_value || 'Not Made Public',
          facebook:
            (
              rep.identifiers.find(
                (id) => id.identifier_type === 'FACEBOOK-OFFICIAL'
              ) ||
              rep.identifiers.find((id) => id.identifier_type === 'FACEBOOK') ||
              rep.identifiers.find(
                (id) => id.identifier_type === 'FACEBOOK-CAMPAIGN'
              ) || { identifier_value: '' }
            ).identifier_value.replace(
              /^(?:https?:\/\/(www\.)?facebook\.com\/)?(.+)\/?$/,
              '$1'
            ) || 'Not Made Public',
          contactPage:
            rep.web_form_url || (Array.isArray(rep.urls) && rep.urls[0]) || '',
          photoUrl:
            rep.photo_origin_url ||
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

function formatName(rep) {
  const nameParts = []

  // Only include salutations that are not "The Honorable", e.g. "Dr."
  if (rep.salutation && !/^(?:The )?Honorable$/.test(rep.salutation)) {
    nameParts.push(rep.salutation)
  }

  if (rep.preferred_name) {
    nameParts.push(rep.preferred_name)
  } else if (rep.first_name) {
    nameParts.push(rep.first_name)
  }

  // Ignore `middle_initial` (which is often a full name, for the record, NOT an initial)
  // Ignore `nickname`

  if (rep.last_name) {
    nameParts.push(rep.last_name)
  }

  if (rep.name_suffix) {
    nameParts.push(rep.name_suffix)
  }

  return nameParts.join(' ')
}

module.exports = router
