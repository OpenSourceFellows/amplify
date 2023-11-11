const bcrypt = require('bcryptjs')

// Generates password hash with salt rounds
async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

// Checks hash against password input
async function comparePassword(input, hash) {
  const isMatch = await bcrypt.compare(input, hash)
  return isMatch
}

module.exports = { encryptPassword, comparePassword }
