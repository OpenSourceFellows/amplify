const BaseModel = require('./_base')

class LetterTemplate extends BaseModel {
  static get tableName() {
    return 'letter_templates'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['lob_template_id', 'sendgrid_template_id', 'merge_variables'],

      properties: {
        subject: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        merge_variables: { type: 'object' }
      }
    }
  }
}

module.exports = LetterTemplate
