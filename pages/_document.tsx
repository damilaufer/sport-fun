import Document, { Head, Html, Main, NextScript } from 'next/document'

import packageJson from '../package.json'

class MyDocument extends Document {
  render() {
    return (
      <Html
        style={{
          fontSize: '20px',
          padding: 0,
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
        }}
      >
        <Head>
          <meta name="theme-color" content="#2D6BB5" />
        </Head>
        <body dir="rtl" style={{ margin: 0, minHeight: '100vh' }}>
          <div style={{ display: 'none' }}>{packageJson.version}</div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
