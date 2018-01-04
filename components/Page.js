import { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import Router from 'next/router'
import Loader from './Loader'
import { logInWithToken, logOut } from '../helpers/auth'
import { initStore } from '../redux/store'
import ACTION_CREATORS from '../redux/action-creators'

/*
  Every page requires a user to be logged in,
  except those whitelisted as a public path.
 */
const PUBLIC_PATHS = [
  '/verify-email'
]

// If logged in, redirect to /home
const REDIRECT_TO_HOME_PATHS = [
  '/',
  '/login'
]

const onLogIn = Page => ({
  success: user => {
    const { setUser, url } = Page.props

    // Hydrate Redux
    setUser(user)

    // If active account, redirect from / and /login
    if (user.account.activated) {
      if (REDIRECT_TO_HOME_PATHS.includes(url.pathname)) {
        return Router.replace('/home')
      }
    }

    // Redirect to activate account if incomplete
    else if (url.pathname !== '/activate-account') {
      return Router.replace('/activate-account')
    }

    Page.setState({ ready: true })
  },
  error: e => Page.logOut()
})

// Connect the page to Redux and check user status on page load
export default PageComponent => {
  class Page extends Component {
    constructor() {
      super()
      this.state = { ready: false }
      this.logOut = this.logOut.bind(this)
      this.validateClaims = this.validateClaims.bind(this)
    }

    componentDidMount() {
      // No login attempt on public paths or if user exists
      const shouldCheckLogin = !PUBLIC_PATHS.includes(this.props.url.pathname)
      const hasUser = !!this.props.user
      const noLoginAttempt = !shouldCheckLogin || hasUser

      if (noLoginAttempt) {
        return this.setState({ ready: true })
      }

      // Attempt login on page load, and redirect if valid user
      logInWithToken(onLogIn(this))
    }

    render() {
      if (!this.state.ready) return <Loader />
      return <PageComponent {...this.props}
              logOut={this.logOut}
              validateClaims={this.validateClaims} />
    }

    logOut(e) {
      if (e) e.preventDefault()
      const callback = () => {
        this.setState({ ready: true })
        if (this.props.user) this.props.clearState()
      }
      logOut({ success: callback, error: callback })
    }

    validateClaims(claims = {}) {
      const { user } = this.props
      if (!user) return Router.replace('/login')
      if (!user.customClaims) return Router.replace('/login')
      let allowUser = false

      // If user meets just 1 condition, let them through
      Object.keys(claims).map(key => {
        if (allowUser) return
        if (user.customClaims[key] === claims[key]) {
          allowUser = true
        }
      })

      if (!allowUser) Router.replace('/home')
    }
  }

  const HOC = connect(state => state)(Page)
  const REDUX_OPTS = {
    createStore: initStore,
    mapStateToProps: state => state,
    mapDispatchToProps: dispatch => {
      return Object.keys(ACTION_CREATORS).reduce((obj, method) => {
        obj[method] = bindActionCreators(ACTION_CREATORS[method], dispatch)
        return obj
      }, {})
    }
  }
  return withRedux(REDUX_OPTS)(HOC)
}
