const BaseModel = require('./_base')

class Admin extends BaseModel {
  static get tableName() {
    return 'admins'
  }

  static timestamps() {
    return true
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'password'],

      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 6, maxLength: 127 },
        password: { type: 'string' },
        active: { type: 'boolean' },
        created_at: { type: 'string', minLength: 1, maxLength: 50 },
        updated_at: { type: 'string', minLength: 1, maxLength: 50 }
      }
    }
  }
}

module.exports = Admin
