import { Component } from 'react'
import Error from '../components/Error'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Form from '../components/Form'
import FormFields from '../components/FormFields'
import Head from 'next/head'
import Router from 'next/router'
import { addUser, getUserList } from '../helpers/users'

class NewUser extends Component {
  constructor() {
    super()

    this.state = {
      error: null,
      user: {
        email: '',
        role: 'client'
      }
    }

    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    this.props.validateClaims({
      admin: true
    })
  }

  render() {
    return (
      <Layout {...this.props}>
        <div className="new-user">
          <Head>
            <title>New User</title>
          </Head>
          <div className="form-wrapper">
            <Form title="Create New User">
              <h2>User Info</h2>
              <FormFields
                parent={this}
                stateKey={'user'}
                labelWidth="6rem"
                fields={{
                  'email': {
                    type: 'text',
                    placeholder: 'client@domain.com'
                  },
                  'displayName': {
                    type: 'text',
                    label: 'name',
                    placeholder: 'Joe Smith'
                  }
                }} />
              <h2>Custom Claims</h2>
              <FormFields
                parent={this}
                stateKey={'user'}
                labelWidth="6rem"
                fields={{
                  'role': {
                    type: 'radio',
                    defaultValue: this.state.user.role,
                    options: [
                      'admin',
                      'client'
                    ].map(value => ({ key: value, value }))
                  }
                }} />
              <FormFields
                parent={this}
                stateKey={'user'}
                fields={{
                  'submit': {
                    type: 'submit',
                    defaultValue: 'Create User',
                    float: 'left',
                    noLabel: true,
                    noMargin: true,
                    onClick: this.submit
                  }
                }} />
            </Form>
          </div>
        </div>
        {
          this.state.error
          ? <Error>{this.state.error}</Error>
          : null
        }
        <style jsx>{`
          .form-wrapper {
            max-width: 50rem;
          }
          h2 {
            margin-bottom: 1rem;
          }
        `}</style>
      </Layout>
    )
  }

  submit() {
    // Clear errors
    this.setState({ error: null })

    // Add new user
    addUser({
      user: this.state.user,
      success: payload => {
        // Update user list in redux then redirect to user detail
        const { uid } = payload.data

        // TODO: Only get the updated user
        getUserList({
          success: users => {
            this.props.setUsers(users)
            Router.replace(`/user-detail?uid=${uid}`, `/user/${uid}`)
          },
          error: e => Router.replace('/users')
        })
      },
      error: e => this.setState({ error: e.message })
    })
  }
}

export default Page(NewUser)
