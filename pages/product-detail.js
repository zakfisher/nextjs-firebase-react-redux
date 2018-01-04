import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Head from 'next/head'

class ProductDetail extends Component {
  componentWillMount() {
    this.props.validateClaims({
      admin: true
    })
  }

  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Product Detail</title>
        </Head>
        <h2>Product Detail</h2>
        <p>product #{this.props.url.query.id}</p>
        <style jsx>{`
          h2 { color: purple; }
        `}</style>
      </Layout>
    )
  }
}

export default Page(ProductDetail)
