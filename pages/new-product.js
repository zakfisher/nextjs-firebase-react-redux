import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import Page from '../components/Page'
import Loader from '../components/Loader'
import BasicList from '../components/BasicList'
import Head from 'next/head'
import Router from 'next/router'
// import { getProductList } from '../helpers/products'

class NewProduct extends Component {
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

  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>New Product</title>
        </Head>
        <h1>New Product</h1>
        {
          this.props.error
          ? <p>{this.state.error}</p>
          : null
        }
        <style jsx>{`

        `}</style>
      </Layout>
    )
  }
}

export default Page(NewProduct)
