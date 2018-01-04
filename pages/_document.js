import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import GLOBAL_STYLES from '../styles/global'
import FONTS from '../styles/fonts'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    const styles = flush()
    return { html, head, errorHtml, chunks, styles }
  }

  render() {
    const favicon = "/static/favicon.png"
    const viewport = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, height=device-height'
    const description = 'Admin panel for clients'
    const keywords = 'admin, panel, clients'

    return (
      <html>
        <Head>
          <meta content="IE=Edge" httpEquiv="X-UA-Compatible" />
          <meta name="viewport" content={viewport} />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta property="og:title" content="" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="" />
          <meta property="og:site_name" content="" />
          <meta property="og:type" content="" />
          <meta property="og:url" content="" />
          <meta name="twitter:title" content="" />
          <meta name="twitter:description" content="" />
          <meta name="twitter:image" content="" />
          <meta name="twitter:card" content="" />
          <meta name="twitter:site" content="" />
          <link rel="shortcut icon" href={favicon} />
          <link href={`https://fonts.googleapis.com/css?family=${FONTS.default}`} rel="stylesheet" />
          <style>{GLOBAL_STYLES}</style>
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}