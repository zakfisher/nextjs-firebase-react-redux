import { Component } from 'react'
import BasicList from '../components/BasicList'
import Layout from '../components/DashboardLayout'
import Error from '../components/Error'
import Loader from '../components/Loader'
import Form from '../components/Form'
import FormFields from '../components/FormFields'
import Page from '../components/Page'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { getUserById, updateUser } from '../helpers/users'

class UserDetail extends Component {
  constructor() {
    super()

    this.state = {
      error: null,
      user: null
    }

    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    this.props.validateClaims({
      admin: true
    })
  }

  componentDidMount() {
    const { uid } = this.props.url.query
    const error = 'Unable to get user by id ' + uid
    getUserById({
      uid,
      users: this.props.users,
      success: (users, user) => {
        // Cache users in Redux (if we haven't already)
        if (!this.props.users) {
          this.props.setUsers(users)
        }
        this.setState({
          error: user ? null : error,
          user
        })
      },
      error: e => {
        this.setState({
          error,
          user: null
        })
      }
    })
  }

  render() {
    return (
      <Layout {...this.props}>
        {
          this.state.user
          ? (
              <div className="user-detail">
                <Head>
                  <title>{this.state.user.displayName}</title>
                </Head>
                <Form title="User Detail">
                  <div className="half-width left">
                    <h2>Profile</h2>
                    <FormFields
                      parent={this}
                      stateKey={'user'}
                      fields={{
                        'displayName': {
                          type: 'text'
                        },
                        'email': {
                          type: 'text'
                        },
                        'photoURL': {
                          type: 'text'
                        },
                        'phoneNumber': {
                          type: 'text',
                          label: 'phone'
                        },
                      }} />
                    {
                      this.state.user.products
                      ? (
                          <div>
                            <h2>Products</h2>
                            <BasicList
                              list={this.state.user.products}
                              as={'/product'}
                              href={'/product-detail'}
                              idKey={'id'}
                              nameKey={'title'}
                              />
                          </div>
                        )
                      : null
                    }
                  </div>
                  <div className="half-width right">
                    <h2>Custom Claims</h2>
                    <FormFields
                      parent={this}
                      stateKey={'user'}
                      fields={{
                        'role': {
                          type: 'radio',
                          defaultValue: (() => {
                            if (this.state.user.customClaims.admin) return 'admin'
                            if (this.state.user.customClaims.client) return 'client'
                          })(),
                          options: [
                            'admin',
                            'client'
                          ].map(value => ({ key: value, value }))
                        }
                      }} />
                    <h2>Metadata</h2>
                    <FormFields
                      parent={this}
                      stateKey={'user'}
                      fields={{
                        'uid': {
                          disabled: true,
                          type: 'text'
                        },
                        'emailVerified': {
                          disabled: true,
                          type: 'radio',
                          defaultValue: this.state.user.emailVerified.toString(),
                          options: [
                            true,
                            false
                          ].map(value => ({ key: value, value: value.toString() }))
                        },
                        'disabled': {
                          type: 'radio',
                          defaultValue: this.state.user.disabled.toString(),
                          options: [
                            true,
                            false
                          ].map(value => ({ key: value, value: value.toString() }))
                        },
                        'metadata.lastSignInTime': {
                          disabled: true,
                          type: 'text',
                          label: 'last login'
                        },
                        'metadata.creationTime': {
                          disabled: true,
                          type: 'text',
                          label: 'created'
                        }
                      }} />
                  </div>
                  <br/>
                  <FormFields
                    parent={this}
                    stateKey={'user'}
                    fields={{
                      'submit': {
                        type: 'submit',
                        defaultValue: 'Update User',
                        float: 'left',
                        noLabel: true,
                        noMargin: true,
                        onClick: this.submit
                      }
                    }} />
                </Form>
                <p>Reset Password</p>
                <p>Delete User</p>
                <p>Send Verification Email</p>
                <style jsx>{`
                  h2 {
                    margin-bottom: 1rem;
                  }
                  @media screen and (min-width: 1100px) {
                    .half-width {
                      float: left;
                      width: 50%;
                    }
                    .half-width.left {
                      padding-right: 0.75rem;
                    }
                    .half-width.right {
                      padding-left: 0.75rem;
                    }
                  }
                `}</style>
              </div>
            )
          : this.state.error ? null : <Loader />
        }
        {
          this.state.error
          ? <Error>{this.state.error}</Error>
          : null
        }
      </Layout>
    )
  }

  submit() {
    updateUser({
      user: this.state.user,
      success: () => {},
      error: () => {}
    })
  }
}

export default Page(UserDetail)
