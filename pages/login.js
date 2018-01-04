import { Component } from 'react'
import Page from '../components/Page'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Form from '../components/Form'
import FormFields from '../components/FormFields'
import Head from 'next/head'
import Router from 'next/router'
import { logInWithCredentials } from '../helpers/auth'
const { color1 } = require('../styles/colors')

class Login extends Component {
  constructor() {
    super()

    this.state = {
      credentials: {},
      error: null
    }

    this.submit = this.submit.bind(this)
  }

  submit() {
    if (!this.state.credentials.email.length) {
      return this.setState({ error: 'Please enter an email' })
    }
    if (!this.state.credentials.password.length) {
      return this.setState({ error: 'Please enter a password' })
    }

    logInWithCredentials.bind(this)({
      credentials: this.state.credentials,
      success: user => {
        this.props.setUser(user)
        if (user.account.activated) Router.replace('/home')
        else Router.replace('/activate-account')
      },
      error: e => {
        this.setState({ error: e.message })
      }
    })
  }

  render() {
    if (this.props.user) return <Loader />

    return (
      <div className="login">
        <Head>
          <title>Login</title>
        </Head>
        <div className="inner">
          <div className="form">
            <Form
              title="My Account"
              submit={this.submit}>
              <FormFields
                parent={this}
                stateKey={'credentials'}
                fields={{
                  'email': {
                    type: 'text',
                    placeholder: 'email',
                    noLabel: true,
                    defaultValue: ''
                  },
                  'password': {
                    type: 'password',
                    placeholder: 'password',
                    noLabel: true,
                    defaultValue: ''
                  }
                }} />
              <FormFields
                parent={this}
                stateKey={'credentials'}
                fields={{
                  'submit': {
                    type: 'submit',
                    className: 'black',
                    defaultValue: 'Log In',
                    noLabel: true,
                    noMargin: true,
                    onClick: this.submit
                  }
                }} />
            </Form>
          </div>
          {
            this.state.error
            ? (
                <div className="error">
                  <Error style={{background: '#000'}}>{this.state.error}</Error>
                </div>
              )
            : null
          }
        </div>
        <style jsx>{`
          * {
            text-align: center;
          }
          .login {
            background: #111;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .form {
            top: 1rem;
            width: 75%;
          }
          .inner {
            width: 30rem;
            border-radius: 100%;
            height: 30rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: white;
          }
          .error {
            position: absolute;
            top: calc(100% + 2rem);
            width: 90%;
          }
        `}</style>
      </div>
    )
  }
}

export default Page(Login)
