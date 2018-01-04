const express = require('express')
const router = express.Router()
const Auth = require('../helpers/auth')
const Users = require('../helpers/users')

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
  // Get user list (must pass idToken post param)
  router.post('/', (req, res) => {
    Auth.getCustomClaims({
      idToken: req.body.idToken,
      success: claims => {
        if (claims.admin) {
          return getUsers(req, res)
        }
        res.status(500).send({
          error: 'Not authorized'
        })
      },
      error: () => {
        res.status(500).send({
          error: 'Unable to get custom claims'
        })
      }
    })
  })
}

function dev(server) {
  // List all users
  router.get('/list', (req, res) => {
    getUsers(req, res)
  })
}

function getUsers(req, res) {
  Users.get({
    success: payload => {
      res.setHeader('Content-Type', 'application/json');
      res.json(payload)
    },
    error: e => {
      res.status(500).send({
        error: 'Unable to get users'
      })
    }
  })
}