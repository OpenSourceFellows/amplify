// validate input value, expects a number as parameter
function validate(value) {
  let inputIsValid = true,
    message = ''

  if (value > 1.49 && value < 10000.01) return [inputIsValid, message]

  if (isNaN(value)) message = 'Please select or enter a valid amount.'
  if (value < 1.5) message = 'Please enter a donation amount higher than $1.50.'
  if (value > 10000)
    message =
      'Amplify currently only accept donation amounts less than $10,000.'

  inputIsValid = false
  return [inputIsValid, message] // i.e. [ false, "Please select or enter a valid amount." ]
}

module.exports = validate