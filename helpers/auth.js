import axios from 'axios'
import firebase from './firebase'
import Router from 'next/router'

const auth = firebase.auth()
const db = firebase.firestore()

const onLogInSuccess = ({ success, error }) => {
  getUserIdToken({
    newToken: true,
    success: async idToken => {
      // Get customToken from server
      getCustomToken({ idToken })

      // Get user model from server
      let user = null
      try { user = await axios.post('/user/get', { idToken, uid: auth.currentUser.uid }) }
      catch(e) { return error(e) }

      success(user.data)
    }, error
  })
}

// Sign user in with credentials
export const logInWithCredentials = async ({ credentials, success, error }) => {
  const { email, password } = credentials
  try { await auth.signInWithEmailAndPassword(email, password) }
  catch(e) { return error(e) }
  onLogInSuccess({ success, error })
}

// Log in with custom token
export const logInWithToken = async ({ success, error }) => {
  const token = window.localStorage.getItem('customToken')
  if (!token) return error({ message: 'no token provided' })
  try { await auth.signInWithCustomToken(token) }
  catch(e) { return error(e) }
  onLogInSuccess({ success, error })
}

// Sign out from firebase
export const logOut = async ({ success, error }) => {
  try { await auth.signOut() }
  catch(e) { return error(e) }
  window.localStorage.clear()
  Router.replace('/login')
  success()
}

// Get user idToken
export const getUserIdToken = async ({ newToken, success, error }) => {
  let idToken = null
  try { idToken = await auth.currentUser.getIdToken(newToken) }
  catch(e) { return error(e) }
  return success(idToken)
}

// Get user customToken from server, then cache in localStorage
export const getCustomToken = async ({ idToken, success, error }) => {
  success = success || (() => {})
  error = error || (() => {})
  let customToken = null
  try { customToken = await axios.post('/login', { idToken }) }
  catch(e) { return error(e) }
  customToken = customToken.data
  window.localStorage.setItem('customToken', customToken)
  return success(customToken)
}
