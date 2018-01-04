const express = require('express')
const router = express.Router()

module.exports = server => {
  middleware(server)
  routes(server)
  if (server.get('dev')) dev(server)
  return router
}

function middleware(server) {
  router.use(function(req, res, next) {
    next()
  })
}

function routes(server) {
  const app = server.get('app')

  // Product Detail Page
  router.get('/:id', (req, res) => {
    const actualPage = '/product-detail'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })
}

function dev(server) {}