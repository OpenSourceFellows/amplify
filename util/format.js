// format input value
function formatDonationAmount(value) {
  // separating parameter assignment and parseFloat operation for consistent outcome
  value = parseFloat(value) // outputs: number
  value = value.toFixed(2) // outputs: string
  value = parseFloat(value) // outputs: number
  return value // number
}

module.exports = { formatDonationAmount }
