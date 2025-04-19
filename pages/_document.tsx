import Document, { Head, Html, Main, NextScript } from 'next/document'

import packageJson from '../package.json'

class MyDocument extends Document {
  render() {
    return (
      <Html style={{ fontSize: '22px' }}>
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
