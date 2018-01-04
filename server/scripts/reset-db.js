const Users = require('../helpers/users')
const admin = require('../helpers/firebase-admin')
const db = admin.firestore()
const batch = db.batch()

function deleteUsers(next) {
  Users.get({
    success: payload => {
      // Delete each user
      const userPromises = payload.users.map(({ uid }) => {
        return admin.auth().deleteUser(uid)
      })

      Promise.all(userPromises)
      .then(() => {
        console.log('Deleted all users')
        next()
      })
      .catch(e => {
        console.log('Unable to delete users', e)
        next()
      })
    },
    error: e => {
      console.log('Unable to get users', e)
      next()
    }
  })
}

function deleteUserAccounts() {
  db.collection('user_accounts').get()
  .then(snapshot => {
    snapshot.docs.map(doc => {
      batch.delete(doc.ref)
    })
    batch.commit().then(() => {
      console.log('Deleted user_accounts collection', snapshot.size)
      process.exit()
    })
  })
  .catch(e => {
    console.log('Unable to delete user_accounts', e)
    process.exit()
  })
}

deleteUsers(deleteUserAccounts)