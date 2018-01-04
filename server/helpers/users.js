const btoa = require('btoa')
const admin = require('./firebase-admin')
const sendVerificationEmail = require('../emails/verify-email')

const auth = admin.auth()
const db = admin.firestore()

const Users = {}

// Get a list of users
Users.get = ({ pageToken, success, error }, limit = 1000) => {
  return auth.listUsers(limit, pageToken)
  .then(success)
  .catch(error)
}

// Get user by id
Users.getById = ({ uid, success, error }) => {
  let user = {}
  return auth.getUser(uid)
  .then(userRecord => {
    user = { ...userRecord }
    delete user.providerData
    delete user.passwordHash
    return db.collection('user_accounts').doc(uid).get()
  })
  .then(doc => {
    return new Promise((resolve, reject) => {
      if (!doc.exists) return reject()
      resolve(doc.data())
    })
  })
  .then(userAccount => {
    user.account = userAccount
    delete user.account.uid
    success(user)
  })
  .catch(error)
}

// Add a user
Users.add = ({ isDev, user, success, error }) => {
  const data = {}

  // Create new user
  return auth.createUser(user)

  // Set custom claims
  .then(({ uid }) => {
    data.uid = uid
    return auth.setCustomUserClaims(uid, user.customClaims)
  })

  // Create new user account
  .then(() => {
    return db.collection('user_accounts').doc(data.uid).set({
      uid: data.uid,
      activated: false,
      terms: false,
      billing: {
        paymentMethods: {
          creditCards: {},
          bankAccounts: {}
        },
        invoices: {}
      },
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: ''
      },
      products: {}
    })
  })

  // Send verification email
  .then(() => {
    sendVerificationEmail({
      isDev,
      email: user.email,
      token: btoa(JSON.stringify({
        email: user.email,
        password: user.password
      }))
    })
    success(data)
  })
  .catch(error)
}

// Update a user
Users.update = ({ uid, user, success, error }) => {
  return auth.updateUser(uid, user)
  .then(() => {
    if (user.customClaims) return auth.setCustomUserClaims(uid, user.customClaims)
    return new Promise((resolve, reject) => resolve())
  })
  .then(() => {
    if (user.account) return db.collection('user_accounts').doc(uid).update(user.account)
    return new Promise((resolve, reject) => resolve())
  })
  .then(success)
  .catch(error)
}

module.exports = Users
