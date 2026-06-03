import axios from 'axios'
import { API, APIError } from '../index'

jest.mock('axios')

afterEach(() => {
  jest.clearAllMocks()
})

describe('API — URL construction', () => {
  test('builds base URL with version', () => {
    const api = new API('/campaigns', 'v1')
    expect(api.baseUrl).toBe('/api/v1/campaigns')
  })

  test('builds base URL without version', () => {
    const api = new API('/representatives')
    expect(api.baseUrl).toBe('/api/representatives')
  })
})

describe('API — get()', () => {
  test('returns response.data on success', async () => {
    const mockData = { id: 1, name: 'test' }
    axios.get.mockResolvedValue({ data: mockData })

    const api = new API('/campaigns')
    const result = await api.get()
    expect(result).toEqual(mockData)
  })

  test('throws APIError on failure', async () => {
    axios.get.mockRejectedValue({
      message: 'Not found',
      response: { status: 404 }
    })

    const api = new API('/campaigns')
    await expect(api.get()).rejects.toThrow(APIError)
  })

  test('APIError carries HTTP status', async () => {
    axios.get.mockRejectedValue({
      message: 'Not found',
      response: { status: 404 }
    })

    const api = new API('/campaigns')
    await expect(api.get()).rejects.toMatchObject({ status: 404 })
  })
})

describe('API — post()', () => {
  test('returns response.data on success', async () => {
    const mockData = { letter: '<p>Hello</p>' }
    axios.post.mockResolvedValue({ data: mockData })

    const api = new API('/letter_templates', 'v1')
    const result = await api.post('/render', { templateId: 1 })
    expect(result).toEqual(mockData)
  })

  test('throws APIError on failure', async () => {
    axios.post.mockRejectedValue({
      message: 'Server error',
      response: { status: 500 }
    })

    const api = new API('/letter_templates', 'v1')
    await expect(api.post('/render', {})).rejects.toThrow(APIError)
  })

  test('APIError carries HTTP status', async () => {
    axios.post.mockRejectedValue({
      message: 'Server error',
      response: { status: 500 }
    })

    const api = new API('/letter_templates', 'v1')
    await expect(api.post('/render', {})).rejects.toMatchObject({ status: 500 })
  })
})
