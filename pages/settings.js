import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'
import Router from 'next/router'

class Settings extends Component {
  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Settings</title>
        </Head>
        <h2>Settings</h2>
      </Layout>
    )
  }
}

export default Page(Settings)
