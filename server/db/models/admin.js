const BaseModel = require('./_base')

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

class Admin extends BaseModel {
  static get tableName() {
    return 'admins'
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created, it is checked against this schema. http://json-schema.org/
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'password', 'active'],

      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        email: {
          type: 'string',
          format: 'email',
          pattern: emailRegex,
          minLength: 6,
          maxLength: 127
        },
        password: { type: 'string', minLength: 8 },
        active: { type: 'boolean' }
      }
    }
  }
}

module.exports = Admin
