const dev = process.env.NODE_ENV !== 'production'
if (!dev) require('newrelic')

const next = require('next')
const app = next({ dir: '.', dev })
const express = require('express')
app.prepare().then(startServer)

function startServer() {
  const server = express()
  server.set('app', app)
  server.set('dev', dev)
  require('./middleware')(server)
  require('./routes')(server)
  const port = process.env.PORT || 3000
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http:\/\/localhost:${port}`)
  })
}