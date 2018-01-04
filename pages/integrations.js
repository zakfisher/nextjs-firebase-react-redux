import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'

class Integrations extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Integrations</title>
        </Head>
        <h2>Integrations</h2>
      </Layout>
    )
  }
}

export default Page(Integrations)
