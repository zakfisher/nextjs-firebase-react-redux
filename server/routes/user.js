const express = require('express')
const generatePW = require('password-generator')
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
  const app = server.get('app')

  // User Detail Page
  router.get('/:uid', (req, res) => {
    const actualPage = '/user-detail'
    const queryParams = { uid: req.params.uid }
    app.render(req, res, actualPage, queryParams)
  })

  // Get User
  router.post('/get', (req, res) => {
    Auth.getCustomClaims({
      idToken: req.body.idToken,
      success: claims => {
        const isUser = req.body.uid === claims.uid
        const isAdmin = claims.admin
        if (isUser || isAdmin) return getUser(req, res)
        res.status(500).send({ error: 'Not authorized' })
      },
      error: () => res.status(500).send({ error: 'Unable to get custom claims' })
    })
  })

  // Add User
  router.post('/add', (req, res) => {
    Auth.getCustomClaims({
      idToken: req.body.idToken,
      success: claims => {
        if (claims.admin) return addUser(req, res, server.get('dev'))
        res.status(500).send({ error: 'Not authorized' })
      },
      error: () => res.status(500).send({ error: 'Unable to get custom claims' })
    })
  })

  // Update User
  router.post('/update', (req, res) => {
    Auth.getCustomClaims({
      idToken: req.body.idToken,
      success: claims => {
        const isUser = req.body.uid === claims.uid
        const isAdmin = claims.admin
        if (isUser || isAdmin) {
          if (!isAdmin) delete req.body.user.customClaims
          return updateUser(req, res)
        }
        res.status(500).send({ error: 'Not authorized' })
      },
      error: () => res.status(500).send({ error: 'Unable to get custom claims' })
    })
  })

  // Delete User
  // Reset Password
}

function dev(server) {
  // Get user
  router.get('/get/:uid', (req, res) => {
    req.body.uid = req.params.uid
    getUser(req, res)
  })
}

function getUser(req, res) {
  Users.getById({
    uid: req.body.uid,
    success: payload => {
      res.setHeader('Content-Type', 'application/json');
      res.json(payload)
    },
    error: e => res.status(500).send(e)
  })
}

function addUser(req, res, isDev) {
  const { email, displayName, role } = req.body
  Users.add({
    isDev,
    user: {
      email,
      displayName,
      password: generatePW(),
      customClaims: {
        [role]: true
      }
    },
    success: payload => {
      res.setHeader('Content-Type', 'application/json');
      res.json(payload)
    },
    error: e => res.status(500).send(e)
  })
}

function updateUser(req, res) {
  const POST = JSON.parse(req.body.user)

  const user = [
    'uid',
    'disabled',
    'displayName',
    'email',
    'emailVerified',
    'password',
    'phoneNumber',
    'photoURL',
    'account',
    'customClaims'
  ].reduce((obj, key) => {
    if (POST[key]) obj[key] = POST[key]
    return obj
  }, {})

  Users.update({
    uid: req.body.uid,
    user,
    success: payload => {
      res.setHeader('Content-Type', 'application/json');
      res.send(payload)
    },
    error: e => res.status(500).send(e)
  })
}