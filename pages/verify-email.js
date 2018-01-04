import axios from 'axios'
import { Component } from 'react'
import Page from '../components/Page'
import Loader from '../components/Loader'
import Head from 'next/head'
import Router from 'next/router'
import { getUserIdToken, logInWithCredentials } from '../helpers/auth'

class VerifyEmail extends Component {
  componentWillMount() {
    const error = this.error.bind(this)

    // GET param `token` should be a base64 encoded user object
    let { token } = this.props.url.query
    if (!token) return error()

    // Parse token to get credentials
    let credentials = null
    try { credentials = JSON.parse(atob(token)) }
    catch(e) { return error() }

    // Log in with user credentials
    logInWithCredentials.bind(this)({
      credentials,
      success: user => {
        getUserIdToken({
          success: async idToken => {
            // Update user.emailVerified from server
            try {
              await axios.post('/user/update', {
                idToken,
                uid: user.uid,
                user: JSON.stringify({
                  emailVerified: true
                })
              })
            }
            catch(e) { error() }

            // Update redux then redirect to activate account
            user.emailVerified = true
            this.props.setUser(user)
            Router.replace('/activate-account')
          }, error
        })
      }, error
    })
  }

  error(e) {
    Router.replace('/')
  }

  render() {
    return (
      <div>
        <Head>
          <title>Verify Email</title>
        </Head>
        <Loader />
      </div>
    )
  }
}

export default Page(VerifyEmail)
