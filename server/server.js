const { api, web } = require('./app')

const DEPLOYED_PORT = process.env.PORT

const viewPort = process.env.VIEWPORT || 8080
const apiPort = DEPLOYED_PORT || process.env.APIPORT || 6000


if (!DEPLOYED_PORT) {
  web.listen(viewPort, () =>
    console.log(`Web server started on port ${viewPort}`)
  )
}

api.listen(apiPort, () => console.log(`API server started on port ${apiPort}`))
