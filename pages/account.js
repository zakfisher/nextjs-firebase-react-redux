import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'

class Account extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Account</title>
        </Head>
        <h2>Account</h2>
      </Layout>
    )
  }
}

export default Page(Account)
