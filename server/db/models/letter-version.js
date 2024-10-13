const BaseModel = require('./_base')

class LetterVersion extends BaseModel {
  static get tableName() {
    return 'letter_versions'
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created, it is checked against this schema. http://json-schema.org/
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['campaign_id', 'template_id', 'office_division'],

      properties: {
        id: { type: 'integer' },
        campaign_id: { type: 'integer', minimum: 1 },
        template_id: { type: 'string', minLength: 1, maxLength: 255 },
        office_division: {
          type: 'string',
          enum: ['Federal', 'State', 'County', 'Municipality']
        },
        state: {
          anyOf: [
            { type: 'string', minLength: 2, maxLength: 2 },
            { type: 'null' }
          ]
        },
        county: {
          anyOf: [{ type: 'string', minLength: 1 }, { type: 'null' }]
        },
        municipality: {
          anyOf: [{ type: 'string', minLength: 1 }, { type: 'null' }]
        },
        mergeVariables: {}
      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Campaign = require('./campaign')
    return {
      Campaign: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: Campaign,
        join: {
          from: 'letter_versions.campaign_id',
          to: 'campaigns.id'
        }
      }
    }
  }
}

module.exports = LetterVersion
