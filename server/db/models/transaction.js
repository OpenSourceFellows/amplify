// const BaseModel = require('./_base')

/*
class Transaction extends BaseModel {
  static get tableName() {
    return 'transactions'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'stripe_transaction_id', 'amount', 'currency', 'email', 'payment_method', 'payment_method_type'
      ],
      properties: {
        stripe_transaction_id: { type: 'string' },
        amount: { type: 'number' },
        currency: { type: 'string' },
        email: { type: 'string' },
        status: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Constituent = require('./constituent')

    return {
      constituent: {
        relation: BaseModel.HasOneRelation,
        modelClass: Constituent,
        join: {
          // from 'transactions.constituent_id',
          to: 'constituents.id'
        }
      }
    }
  }
}
*/
