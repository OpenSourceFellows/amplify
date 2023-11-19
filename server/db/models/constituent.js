const BaseModel = require('./_base')

class Constituent extends BaseModel {
  static get tableName() {
    return 'constituents'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'email',
        'firstName',
        'lastName',
        'addressLine_1',
        'city',
        'state',
        'zip'
      ],
      properties: {
        email: { type: 'string', minLength: 1, maxLength: 255 },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        address_line_1: { type: 'string', minLength: 1, maxLength: 255 },
        address_line_2: { type: 'string', minLength: 1, maxLength: 255 },
        city: { type: 'string', minLength: 1, maxLength: 255 },
        state: { type: 'string', minLength: 1, maxLength: 255 },
        zip: { type: 'string', minLength: 1, maxLength: 255 }
      }
    }
  }

  /*
  static get relationMappings() {
    // TODO: Add relation to transactions
  }
  */

  fullName() {
    return `${this.first_name} ${this.last_name}`
  }
}

module.exports = Constituent
