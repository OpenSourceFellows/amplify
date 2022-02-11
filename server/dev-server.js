const app = require('./app')
const apiPort = process.env.APIPORT || 6000

app.api.listen(apiPort, () =>
  console.log(`API server started on port ${apiPort}`)
)
