import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Error from '../components/Error'
import Page from '../components/Page'
import Loader from '../components/Loader'
import BasicList from '../components/BasicList'
import Head from 'next/head'
import Router from 'next/router'
import { getUserList } from '../helpers/users'

class Users extends Component {
  constructor() {
    super()

    this.state = {
      error: ''
    }
  }

  componentWillMount() {
    this.props.validateClaims({
      admin: true
    })
  }

  componentDidMount() {
    // Escape if users already cached
    if (this.props.users) return

    // Cache users in redux
    getUserList({
      success: users => this.props.setUsers(users),
      error: e => Router.replace('/home')
    })
  }

  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Users</title>
        </Head>
        {
          this.props.error
          ? <Error>{this.state.error}</Error>
          : null
        }
        {
          this.props.users
          ? <BasicList
              list={this.props.users}
              as={'/user'}
              href={'/user-detail'}
              idKey={'uid'}
              nameKey={'displayName'}
              />
          : <Loader />
        }
      </Layout>
    )
  }
}

export default Page(Users)
