import { Component } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Head from 'next/head'
import Page from '../components/Page'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Form from '../components/Form'
import FormFields from '../components/FormFields'
import ImageForm from '../components/forms/ImageForm'
import ProfileForm from '../components/forms/ProfileForm'
import TermsForm from '../components/forms/TermsForm'
import { getUserIdToken, logInWithCredentials } from '../helpers/auth'

class ActivateAccount extends Component {
  constructor() {
    super()

    this.state = {
      error: null,
      user: null
    }

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.setState({ user: this.props.user })
  }

  render() {
    if (!this.state.user) return <Loader />

    let role = this.props.user.customClaims.admin ? 'Admin' : ''
    role = this.props.user.customClaims.client ? 'Client' : role
    const title = `Activate ${role} Account`

    return (
      <div className="activate-account">
        <Head>
          <title>Activate Account</title>
        </Head>
        <Form
          title={title}
          desc="Finish setting up your account with some basic information. All fields are required."
          submit={this.submit}>

          <section>
            <h2>Image</h2>
            <ImageForm
              bucket={'avatars'}
              parent={this}
              stateKey={'user'} />
          </section>

          <section>
            <h2>Profile</h2>
            <ProfileForm
              parent={this}
              stateKey={'user'} />
          </section>

          <section>
            <h2>Terms</h2>
            <TermsForm
              parent={this}
              stateKey={'user'} />
          </section>

          <FormFields
            parent={this}
            stateKey={'user'}
            fields={{
              'submit': {
                type: 'submit',
                defaultValue: 'Get Started',
                noLabel: true,
                noMargin: true,
                onClick: this.submit
              }
            }} />
        </Form>
        <br/>
        {
          this.state.error
          ? <Error style={{background: 'rgba(255, 0, 0, 0.1)'}}>{this.state.error}</Error>
          : null
        }
        <style jsx>{`
          .activate-account {
            background: white;
            padding: 2rem;
            margin: 2rem auto;
            max-width: 80rem;
            width: calc(100% - 3rem);
          }
          section {
            margin-bottom: 2rem;
          }
          section:after {
            content: ' ';
            display: table;
            clear: both;
          }
          h2 {
            font-size: 1.6rem;
            margin-bottom: 1rem;
          }
          footer {
            margin-top: 2rem;
          }
          footer > div {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
        `}</style>
      </div>
    )
  }

  submit() {
    // Validate data
    const { user } = this.state
    if (!user.photoURL) return this.setState({ error: 'Please select an image' })
    if (!user.displayName) return this.setState({ error: 'Please enter a name' })
    if (!user.email) return this.setState({ error: 'Please enter an email' })
    if (!user.phoneNumber) return this.setState({ error: 'Please enter a phone number' })
    if (!user.password) return this.setState({ error: 'Please enter a password' })
    if (!user.confirmPassword) return this.setState({ error: 'Please confirm your password' })
    if (!user.password === user.confirmPassword) return this.setState({ error: 'Passwords must match' })
    if (!user.terms) return this.setState({ error: 'You must agree to the terms & conditions' })

    // Structure POST data
    const data = {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: `+1${user.phoneNumber.replace(/\D/g, '')}`,
      password: user.password,
      account: {
        activated: true,
        terms: true
      }
    }

    const error = e => this.setState({ error: e.response.data.message || e.message })

    getUserIdToken({
      success: async idToken => {
        // Update the user
        try {
          await axios.post('/user/update', {
            idToken,
            uid: user.uid,
            user: JSON.stringify(data)
          })
        }
        catch(e) { return error(e) }

        // Log in with new credentials
        logInWithCredentials.bind(this)({
          credentials: data,
          success: user => {
            this.props.setUser(user)
            Router.replace('/home?firstTime=true', '/home')
          }, error
        })
      }, error
    })
  }
}

export default Page(ActivateAccount)
