const express = require('express')
const router = express.Router()
const Auth = require('../helpers/auth')

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
  // Get idToken from user, verify, return customToken
  router.post('/', (req, res) => {
    Auth.logInWithToken({
      idToken: req.body.idToken,
      success: customToken => res.send(customToken),
      error: () => res.send(null)
    })
  })
}

function dev(server) {}