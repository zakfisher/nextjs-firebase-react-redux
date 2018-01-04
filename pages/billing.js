import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'

class Billing extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Billing</title>
        </Head>
        <h2>Billing</h2>
      </Layout>
    )
  }
}

export default Page(Billing)
