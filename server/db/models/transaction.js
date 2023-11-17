const BaseModel = require('./_base')

class Transaction extends BaseModel {
  static get tableName() {
    return 'transactions'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'stripeTransactionId',
        'constituentId',
        'amount',
        'currency',
        'paymentMethod'
      ],
      properties: {
        stripe_transaction_id: { type: 'string' },
        constituent_id: { type: 'number' },
        amount: { type: 'number' },
        currency: { type: 'string' },
        payment_method: { type: 'string' },
        status: { type: 'string' }
      }
    }
  }

  /*
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
  */
}

module.exports = Transaction
