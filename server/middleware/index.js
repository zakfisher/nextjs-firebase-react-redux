const bodyParser = require('body-parser')
const compression = require('compression')

module.exports = function(server) {
  server.use(bodyParser())
  server.use(compression())
}
