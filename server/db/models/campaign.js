const Model = require('./_base')

class Campaign extends Model {
  static get tableName() {
    return 'campaigns'
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: { type: 'integer' },
        organization: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        cause: { type: 'string', minLength: 1, maxLength: 255 },
        type: { type: 'string', minLength: 1, maxLength: 255 },
        page_url: { type: 'string', minLength: 1, maxLength: 255 },
        letters_counter: { type: 'integer' }
      }
    }
  }
}

module.exports = Campaign
