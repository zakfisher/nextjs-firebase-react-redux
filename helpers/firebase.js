const firebase = require('firebase')
require('firebase/firestore')

try {
  firebase.initializeApp({
    apiKey: "AIzaSyAOumejO6ZidIRcW_IbibQkur7wNyEirNY",
    authDomain: "product-admin-ba57e.firebaseapp.com",
    databaseURL: "https:\/\/product-admin-ba57e.firebaseio.com",
    projectId: "product-admin-ba57e",
    storageBucket: "product-admin-ba57e.appspot.com",
    messagingSenderId: "519737863982"
  })
} catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)
  }
}

export default firebase