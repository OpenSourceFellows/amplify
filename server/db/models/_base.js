const { Model, snakeCaseMappers } = require('objection')
const { createClient } = require('../')

class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname]
  }

  // Maps column_name in postgres to columnName in the app.
  // Queries must still use snake_case if sql is passed into a query method chain
  // For ex. Constituent.query().where('first_name', 'Jennifer')
  static get columnNameMappers() {
    return snakeCaseMappers()
  }
}

// One-time configuration to link all Objection models derived from this class with Knex
BaseModel.knex(createClient())

// Export the base class
module.exports = BaseModel
