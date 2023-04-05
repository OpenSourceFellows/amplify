// validate input value, expects a number as parameter
function validateDonationAmount(value) {
  let message = ''

  if (value > 1.49 && value < 10000.01) return true

  if (isNaN(value)) message = 'Please select or enter a valid amount'
  if (value < 1.5) message = 'Please enter a donation amount higher than $1.50'
  if (value > 10000)
    message =
      'Amplify currently only accept donation amounts less than $10,000.00'

  // logs message to help with debugging
  if (process.env.NODE_ENV === 'development') console.log(message)

  return false
}

module.exports = { validateDonationAmount }
