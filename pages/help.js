import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'

class Help extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Help</title>
        </Head>
        <h2>Help</h2>
      </Layout>
    )
  }
}

export default Page(Help)
