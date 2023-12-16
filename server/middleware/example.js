function exampleMiddleware(req, res, next) {
  console.log('Example middleware was called.')
  next() // Next calls the next middleware in the chain.
}

module.exports = { exampleMiddleware }
