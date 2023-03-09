const { Model } = require('objection')
const { createClient } = require('../')

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname]
  }

  $beforeInsert() {
    if (this.constructor.timestamps) {
      const now = new Date().toISOString()
      this.created_at = now
      this.updated_at = now
    }
  }
}

// One-time configuration to link all Objection models derived from this class with Knex
BaseModel.knex(createClient())

// Export the base class
module.exports = BaseModel
