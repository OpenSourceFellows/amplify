const bcrypt = require('bcrypt.js')

// This could also be a normal module.
class Encryption {
  // progressCheck and handlerFunc (bad name) are used by bcrypt and we can just implement some generic functionality here.
  static progressCheck(progressPercentage) {
    console.log(`Hash progress: ${progressPercentage * 100}`)
  }

  static handlerFunc(error, result) {
    if (error) {
      throw new Error(error.message)
    }

    return result
  }

  // If the function signature for generateHash stays the same, our code will never know about the implementation changing.
  // Of course, there might be a time where we _do_ have to change the func signature, but at least we will then be able to
  // find and replace one thing.
  static async generateHash(string, salt) {
    // This is a simple wrapper, but in other cases we may have more to do!
    return await bcrypt.hash(string, salt, this.handlerFunc, this.progressCheck)
  }

  static async compare(string, hash) {
    return await bcrypt.compare(
      string,
      hash,
      this.handlerFunc,
      this.progressCheck
    )
  }
}

module.exports = { Encryption }

// To use, now we can just do
// const { Encryption } = require('./lib/encryption')
// const hash = await Encryption.generateHash('Hotdogs', 10)
