const BaseModel = require('./_base')

class Admin extends BaseModel {
  static get tableName() {
    return "admins"
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created, it is checked against this schema. http://json-schema.org/
  static get jsonSchema() {
    return {
      type: "object",
      required: ["first_name", "last_name", "email", "password", "active"],

      properties: {
        id: { type: "integer" },
        first_name: { type: "string", minLength: 1, maxLength: 255 },
        last_name: { type: "string", minLength: 1, maxLength: 255 },
        email: {type: "string",minLength: 1, maxLength: 255},
          password: { type: "string"},
        active:{type: "boolean"}

      }
    }
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Campaign = require("./campaign")
    return {
      Admin: {
        relation: BaseModel.HasManyRelation,
        modelClass: Campaign,
        join: {
          from: "campaigns.id",
          to: "letter_versions.campaign_id"
        }
      }
    }
  }
}

module.exports = Admin
