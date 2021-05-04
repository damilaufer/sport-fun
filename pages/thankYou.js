import Head from 'next/head'
import Image from 'next/image'
import { Container } from '@material-ui/core'

const ThankYou = () => {
  return (
    <Container maxWidth="sm">
      <Head>
        <title>Sport-Fun</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px' }}>
          <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
        </div>

        <h1 style={{ color: 'green' }}>ההרשמה הצליחה</h1>
        <h3 style={{ color: 'violet' }}>
          הצוות של Sport-fun יצור איתכם קשר בקרוב
        </h3>
      </main>
    </Container>
  )
}

export default ThankYou
