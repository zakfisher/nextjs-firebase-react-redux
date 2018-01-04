import axios from 'axios'
import firebase from './firebase'
import { getUserIdToken } from '../helpers/auth'

// Get user list from server
// - pass idToken to validate user request
export const getUserList = ({ success, error }) => {
  getUserIdToken({
    success: async idToken => {
      let payload = null
      try { payload = await axios.post('/users', { idToken }) }
      catch(e) { return error(e) }
      success(payload.data.users)
    }, error
  })
}

export const getUserById = ({ users, uid, success, error }) => {
  // Get user by id
  if (users) {
    const user = users.filter(u => u.uid === uid)[0] || null
    return success(users, user)
  }

  // Get users if we haven't already
  getUserList({
    success: users => {
      getUserById({ users, uid, success, error })
    }, error
  })
}

// Only admin can add a user, so it must be handled on the server
// Creating a new user on the client will log you in as that user
export const addUser = ({ user, success, error }) => {
  getUserIdToken({
    success: async idToken => {
      let payload = null
      try { payload = await axios.post('/user/add', { idToken, ...user }) }
      catch(e) { return error(e.response.data) }
      success(payload)
    }, error
  })
}

export const verifyUserEmail = () => {}
export const activateUserAccount = () => {}