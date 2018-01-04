const USER = {
  uid: null,
  displayName: '',
  email: '',
  emailVerified: false,
  photoURL: '',
  phoneNumber: '',
  disabled: false,
  customClaims: {
    admin: false,
    client: false
  },
  metadata: {
    lastSignInTime: '',
    creationTime: ''
  }
}

module.exports = USER