import { Component } from 'react'
import Layout from '../components/DashboardLayout'
import BasicList from '../components/BasicList'
import Loader from '../components/Loader'
import Page from '../components/Page'
import Head from 'next/head'

class Products extends Component {
  componentWillMount() {
    if (this.props.products) return

    // getProductList(...)
    this.props.setProducts([
      { id: 'abc', title: 'ABC' }
    ])
  }

  render() {
    return (
      <Layout {...this.props}>
        <Head>
          <title>Products</title>
        </Head>
        {
          this.props.products
          ? <BasicList
              list={this.props.products}
              as={'/product'}
              href={'/product-detail'}
              idKey={'id'}
              nameKey={'title'}
              />
          : <Loader />
        }
      </Layout>
    )
  }
}

export default Page(Products)
