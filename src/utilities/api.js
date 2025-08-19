const axios = require('axios')

class APIError extends Error {
  constructor(message) {
    super(message)
    this.name = 'APIError'
  }
}

class API {
  constructor(version) {
    // Version might be something like 'v1'.
    // Then, it could drop directly into the url
    if (!version) {
      throw new APIError('Version must be specified in the format "vx"')
    }

    this.version = version
  }

  baseUrl() {
    // While this is very simple right now,
    // in the future we may have a much more complicated api
    // structure and this can easily resolve that.
    return `api/${this.version}`
  }

  queryParams(query) {
    let qstr = '?'

    for (const param in query) {
      qstr += `${param}=${query[param]}`
    }

    return qstr
  }

  async post(path, data = {}, query = {}) {
    try {
      // The path might need to consider more data when being built,
      // i.e. are we making a request do /path/:id?query_params=...
      let url = `${this.baseUrl()}/${this.path}/${this.queryParams(query)}`
      await axios.post(url, data)
    } catch (err) {
      throw new APIError(err.message)
    }
  }
}

module.exports = { API, APIError }

// Usage
const api = new API('v1')
await api
  .post('admin', {
    /* some data */
  })
  .catch(() => {
    console.error('wtf')
  })
