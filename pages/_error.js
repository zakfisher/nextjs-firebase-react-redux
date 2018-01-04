import { Component } from 'react'
import Router from 'next/router'

class Error extends Component {
  static getInitialProps({ res }) {
    if (res) return res.redirect('/')
    Router.replace('/')
  }

  render() {
    return null
  }
}

export default Error