// Wrapper for the Lob API
// We have the SDK in this project but it has incomplete functionality
// so we will use endpoints directly.
require('dotenv').config()
const axios = require('axios')

class LobError extends Error {
  constructor(message) {
    super(message)
    this.name = 'LobError'
  }
}

class Lob {
  constructor() {
    this.apiKey = process.env.LOB_API_KEY
    this.lobUrl = process.env.LOB_BASE_URL
    this.env = process.env.NODE_ENV
  }

  // auth headers
  authHeaders() {
    const encodedKey = btoa(`${this.apiKey}:`)
    console.log(encodedKey)

    return {
      Authorization: `Basic ${encodedKey}`
    }
  }

  // Merges all headers
  headers() {
    return { ...this.authHeaders() }
  }

  async template(id) {
    try {
      const letters = await axios.get(`${this.lobUrl}/templates/${id}`, {
        headers: this.headers()
      })

      return letters.data.published_version
    } catch (err) {
      throw new LobError(err.message)
    }
  }

  async send(payload) {
    const data = {
      to: payload.to,
      from: payload.from,
      file: payload.templateId,
      merge_variables: payload.mergeVariables,
      use_type: 'operational',
      color: false
    }

    try {
      if (this.env != 'production') {
        return { response: 200, payload }
      }

      const response = await axios.post({
        url: `${this.lobUrl}/letters}`,
        headers: this.headers(),
        'Idempotency-key': payload.uuid,
        data
      })

      return response.data
    } catch (err) {
      throw new LobError(err.message)
    }
  }

  async verifyAddress(address) {
    const payload = {
      recipient: address.name,
      primary_line: address.line1,
      secondary_line: address.line2,
      city: address.city,
      state: address.state,
      zip_code: address.zip
    }

    try {
      const addr = axios.post({
        url: `${this.lobUrl}/us_verifications`,
        headers: this.headers(),
        data: payload
      })

      return addr.data
    } catch (err) {
      throw new LobError(err.message)
    }
  }

  // Args should be the payload returned by verifyAddress()
  // See https://docs.lob.com/#tag/US-Verifications/operation/us_verification
  // For some reason, the parameter names are different b/w endpoints --_--
  async returnAddress(verifiedAddress) {
    const payload = {
      name: verifiedAddress.name,
      address_line1: verifiedAddress.primary_line,
      address_line2: verifiedAddress.secondary_line,
      address_city: verifiedAddress.components.city,
      address_state: verifiedAddress.components.state,
      address_zip: verifiedAddress.components.zip_code
    }

    try {
      const addr = axios.post({
        url: `${this.lobUrl}/addresses`,
        headers: this.headers(),
        data: payload
      })

      return addr.data
    } catch (err) {
      throw new LobError(err.message)
    }
  }
}

module.exports = { Lob, LobError }
