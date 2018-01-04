const admin = require('firebase-admin')
const serviceAccount = require('../keys/firebase-admin.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = admin