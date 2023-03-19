const app = require('./app')
const port = parseInt(process.env.PORT, 10) || 8080

const server = app.listen(port, () => {
  console.log(`App started at http://localhost:${port}/`)
})
module.exports = server
