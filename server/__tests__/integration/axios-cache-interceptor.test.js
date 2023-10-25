// Import required modules
require('dotenv').config()
const Axios = require('axios')
const { setupCache } = require('axios-cache-interceptor')

// 1. We test that the configuration we set is valid and available to check
describe('test Axios configuration', () => {
  test('tests argument composition', () => {
    // Create a new Axios instance and set up caching with the new instance
    const axios = Axios.create()
    const withAxios = setupCache(axios)
    // We expect axios to be properly configured with setupCache
    expect(withAxios).not.toBeUndefined()

    // We expect the cache to be properly configured and contain our properties after initialization
    const withConfig = setupCache(axios, { ttl: 1234 })
    expect(withConfig).not.toBeUndefined()
    expect(withConfig.defaults.cache.ttl).toBe(1234)
  })
})

// 2. We test that the cache is working as expected with concurrent requests
describe('test Axios cache with two requests', () => {
  test('tests cache', async () => {
    // Create a new Axios instance and set up caching with the new instance
    const axios = Axios.create()
    const cache_interceptor = setupCache(axios)

    // We make two sequential requests to the same api endpoint
    const req1 = cache_interceptor.get('https://api.publicapis.org/entries')
    const req2 = cache_interceptor.get('https://api.publicapis.org/entries/')
    const res1 = await req1
    const res2 = await req2

    // Assertions: we expect the second response to be cached
    expect(res1.cached).toBe(false)
    expect(res2.cached).toBe(true)
  })
})

// 3. We test that the cache is invalidated when the ttl expires
describe('test Axios cache invalidation option', () => {
  test('tests cache invalidation', async () => {
    // We set the ttl to 10 seconds
    const axios = Axios.create()
    const cache_interceptor = setupCache(axios, { ttl: 10000 })
    // We make a simple request
    cache_interceptor.get('https://api.publicapis.org/entries')
    // We wait for 11 seconds and make another call
    await new Promise((resolve) => setTimeout(() => resolve(), 11000))
    const req3 = cache_interceptor.get('https://api.publicapis.org/entries')
    const res3 = await req3
    // Assertions: the second request is expected not to be cached, due to the ttl
    expect(res3.cached).toBe(false)
  }, 70000)
})
