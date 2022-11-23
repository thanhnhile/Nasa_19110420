const http = require('http')
const app = require('./app')
const PORT = process.env.PORT || 8000
require('dotenv').config()
const { loadPlanetsData } = require('./models/planets.model')
const { mongoConnect } = require('./services/mongo')

const server = http.createServer(app)
const startServer = async () => {
  await mongoConnect()
  //await loadPlanetsData()
  server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
  })
}
startServer()
