require('dotenv').config()
// import required dependencies for cache interceptor to work
const Axios = require('axios')
const { setupCache } = require('axios-cache-interceptor')

// to test: npm test -- axios-cache-interceptor.test.js
// 1. we test that the configuration we set is valid and available
describe('test Axios configuration', () => {
  test('tests argument composition', () => {
    const axios = Axios.create()
    const withAxios = setupCache(axios)
    expect(withAxios).not.toBeUndefined()

    const withConfig = setupCache(axios, { ttl: 1234 })
    expect(withConfig).not.toBeUndefined()
    expect(withConfig.defaults.cache.ttl).toBe(1234)
  })
})

// 2. we test that the cache is working as expected with concurrent requests
describe('test Axios cache with concurrent requests', () => {
  test('tests cache', async () => {
    const axios = Axios.create()
    const cache_interceptor = setupCache(axios)

    // the response is cached. Reference: https://apipheny.io/free-api/
    const req1 = cache_interceptor.get('https://api.publicapis.org/entries')
    const req2 = cache_interceptor.get('https://api.publicapis.org/entries/')

    // req1 and req2 are the same promise
    const [res1, res2] = await Promise.all([req1, req2])

    // assertions
    expect(res1.cached).toBe(false)
    expect(res2.cached).toBe(true)
  })
})

// 3. we test that the cache is invalidated when the ttl expires
