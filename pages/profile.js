import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'

class Profile extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Profile</title>
        </Head>
        <h2>Profile</h2>
      </Layout>
    )
  }
}

export default Page(Profile)
