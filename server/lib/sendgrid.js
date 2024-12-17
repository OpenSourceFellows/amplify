// Wrapper for Sendgrid API

require('dotenv').config()
const sgMail = require('@sendgrid/mail') // For sending email
const sgClient = require('@sendgrid/client') // For other api endpoints

class SendgridError extends Error {
  constructor(message) {
    super(message)
    this.name = 'SendgridError'
  }
}

class Sendgrid {
  constructor() {
    this.apiKey = process.env.SENDGRID_API_KEY
    this.env = process.env.NODE_ENV

    this.sgMail = sgMail
    this.sgClient = sgClient
    this.sgMail.setApiKey(this.apiKey)
    this.sgClient.setApiKey(this.apiKey)
  }

  async template(id) {
    const params = { method: 'GET', url: `/v3/templates/${id}` }

    try {
      const response = await this.sgClient.request(params)

      console.log(response)
      return response
    } catch (err) {
      throw new SendgridError(err.message)
    }
  }

  async send(payload) {
    if (this.env != 'production') {
      return { response: 200, payload }
    }
  }
}

module.exports = { Sendgrid, SendgridError }
