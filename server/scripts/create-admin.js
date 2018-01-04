const generatePW = require('password-generator')
const Users = require('../helpers/users')

Users.add({
  isDev: true,
  user: {
    email: 'zak.fisher@gmail.com',
    displayName: 'Zak Fisher',
    password: generatePW(),
    customClaims: {
      admin: true
    }
  },
  success: payload => {
    console.log('success!', payload)
    setTimeout(process.exit, 5000)
  },
  error: e => {
    console.log('Unable to create user', e)
    setTimeout(process.exit, 5000)
  }
})
