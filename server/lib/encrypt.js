const bcrypt = require('bcrypt')

// Encrypt password
async function encryptPassword(password) {
  const hash = await bcrypt.hash(password, 10)
  return hash
}

// Check if password is valid
async function validatePassword(inputPassword, storedPassword) {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword)
  return isMatch
}

module.exports = { encryptPassword, validatePassword }
