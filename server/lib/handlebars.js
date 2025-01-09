// Wrapper for Handlebars template engine
const handlebars = require('handlebars')

class HandlebarsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'HandlebarsError'
  }
}

class Handlebars {
  static render(mergeVariables, html) {
    try {
      const template = handlebars.compile(html)

      return template(mergeVariables)
    } catch (err) {
      throw new HandlebarsError(err.message)
    }
  }
}

module.exports = Handlebars
