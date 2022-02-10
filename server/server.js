const {api, web} = require('./app')
const viewPort = process.env.VIEWPORT || 8080
const apiPort = process.env.APIPORT || 6000

web.listen(viewPort, () => console.log(`Web server started on port ${viewPort}`))
api.listen(apiPort, () => console.log(`API server started on port ${apiPort}`))
