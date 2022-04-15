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
        logo_url: { type: 'string', minLength: 1 },
        // TODO: Move `letters_counter` to be a mapped relation
        letters_counter: { type: 'integer', minimum: 0 },
        letters_goal: {
          anyOf: [{ type: 'integer', minimum: 0 }, { type: 'null' }]
        },
        donation_goal: {
          anyOf: [{ type: 'integer', minimum: 0 }, { type: 'null' }]
        }
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const LetterVersion = require('./letter-version')
    return {
      letter_versions: {
        relation: BaseModel.HasManyRelation,
        modelClass: LetterVersion,
        join: {
          from: 'campaigns.id',
          to: 'letter_versions.campaign_id'
        }
      }
    }
  }
}

module.exports = Campaign
