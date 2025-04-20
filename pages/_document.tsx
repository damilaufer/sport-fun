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
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,sans-serif',
        }}
      >
        <Head />
        <body dir="rtl">
          <div style={{ display: 'none' }}>{packageJson.version}</div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
