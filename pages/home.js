import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'

class Home extends Component {
  render() {
    console.log('home', this.props)
    return (
      <Layout {...this.props}>
        <Head>
          <title>Home</title>
        </Head>
        <h2>Home</h2>
        <p>Welcome{ this.props.url.query.firstTime ? '' : ' Back' }!</p>
      </Layout>
    )
  }
}

export default Page(Home)
