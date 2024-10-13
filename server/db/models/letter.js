const BaseModel = require('./_base')

class Letter extends BaseModel {
  static get tableName() {
    return 'letters'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'constituentId',
        'transactionId',
        'letterTemplate',
        'letterVersion',
        'addressee',
        'addressLine_1',
        'city',
        'state',
        'zip'
      ],
      properties: {
        letter_template: { type: 'string', minLength: 1, maxLength: 255 },
        letter_version: { type: 'string', minLength: 1, maxLength: 255 },
        addressee: { type: 'string', minLength: 1, maxLength: 255 },
        address_line_1: { type: 'string', minLength: 1, maxLength: 255 },
        address_line_2: { type: 'string', minLength: 1, maxLength: 255 },
        city: { type: 'string', minLength: 1, maxLength: 255 },
        state: { type: 'string', minLength: 1, maxLength: 255 },
        zip: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }
}

module.exports = Letter
