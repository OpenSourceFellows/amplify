import axios from 'axios'

export class APIError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}

export class API {
  constructor(path, version) {
    this.baseUrl = version ? `/api/${version}${path}` : `/api${path}`
  }

  async get(endpoint = '', params = {}) {
    try {
      const res = await axios.get(this.baseUrl + endpoint, { params })
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }

  async post(endpoint = '', data = {}) {
    try {
      const res = await axios.post(this.baseUrl + endpoint, data)
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }

  async put(endpoint = '', data = {}) {
    try {
      const res = await axios.put(this.baseUrl + endpoint, data)
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }

  async delete(endpoint = '') {
    try {
      const res = await axios.delete(this.baseUrl + endpoint)
      return res.data
    } catch (e) {
      throw new APIError(e.message, e.response?.status)
    }
  }
}
