const BaseModel = require('./_base')

class Campaign extends BaseModel {
  static get tableName() {
    return 'campaigns'
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created, it is checked against this schema. http://json-schema.org/
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['organization', 'name', 'cause', 'type', 'page_url'],

      properties: {
        id: { type: 'integer' },
        organization: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        cause: {
          type: 'string',
          enum: ['Civic Rights', 'Education', 'Climate Justice']
        },
        type: { type: 'string', enum: ['Starter', 'Accelerator', 'Grant'] },
        page_url: { type: 'string', minLength: 1 },
        campaign_tagline: { type: 'string' },
        campaign_text: { type: 'string' },
        supplemental_text: { type: 'string' },
        letter_template_id: { type: 'integer' }
      }
    }
  }
}

module.exports = Campaign
