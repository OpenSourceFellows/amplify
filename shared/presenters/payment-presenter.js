// Business logic for donations and payments
require('dotenv').config

class PaymentPresenterError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PaymentPresenterError'
  }
}

class PaymentPresenter {
  constructor() {
    this.minimumPayment = process.env.MINIMUM_PAYMENT_AMOUNT
    this.maximumPayment = process.env.MAXIMUM_PAYMENT_AMOUNT
  }

  /**
   * Validates that payments aren't something weird, like NaN or a very large number.
   * @param {number} payment
   */
  validatePaymentAmount(payment) {
    if (typeof payment !== 'number') {
      throw new PaymentPresenterError('Payment is not a number')
    }

    if (payment < this.minimumPayment || payment > this.maximumPayment) {
      throw new PaymentPresenterError('Payment amount is out of range')
    }
  }

  /**
   * Formats a value to cents, given a number, float, or numerical string
   * @param {any} payment
   * @returns {number} payment in cents
   */
  formatPaymentAmount(payment) {
    if (typeof payment == 'string') {
      const nonNumerics = new RegExp(/[a-z.,]/, 'g') // Strips alphanumerics, commas, and periods out.

      payment = payment.replace(nonNumerics, '')
      payment = Number(payment)

      if (isNaN(payment)) {
        throw new PaymentPresenterError('Amount is in unexpected format')
      }
    }

    if (typeof payment == 'object') {
      throw new PaymentPresenterError('Unparsable argument')
    }

    return payment
  }
}

module.exports = { PaymentPresenter, PaymentPresenterError }
