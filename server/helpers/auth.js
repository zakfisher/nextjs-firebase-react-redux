const admin = require('./firebase-admin')
const auth = admin.auth()

const Auth = {}

// Get idToken from user, verify, return customToken
Auth.logInWithToken = ({ idToken, success, error }) => {
  return auth.verifyIdToken(idToken)
  .then(({ uid }) => auth.createCustomToken(uid))
  .then(success)
  .catch(error)
}

// Get custom claims from user idToken
Auth.getCustomClaims = ({ idToken, success, error }) => {
  return admin.auth().verifyIdToken(idToken)
  .then(success)
  .catch(error)
}

module.exports = Auth
