const BaseModel = require('./_base')

class ErrorLog extends BaseModel {
  static get tableName() {
    return 'error_logs'
  }

  static timestamps = true

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created, it is checked against this schema. http://json-schema.org/
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['level', 'data'],

      properties: {
        id: { type: 'integer' },
        level: {
          type: 'string',
          enum: ['log', 'error', 'warn', 'info', 'debug']
        },
        data: { type: 'string', minLength: 1, maxLength: 255 },
        created_at: { type: 'string', minLength: 1, maxLength: 50 },
        updated_at: { type: 'string', minLength: 1, maxLength: 50 }
      }
    }
  }
}

module.exports = ErrorLog
