import Head from 'next/head'
import Image from 'next/image'
import { Container } from '@material-ui/core'

const buttonStyle = {
  marginTop: '50px',
  padding: '20px',
  border: '2px solid #2D6BB5',
  borderRadius: '10px',
  fontSize: '2em',
  color: '#2D6BB5',
  backgroundColor: 'transparent',
}

const ThankYou = () => {
  function goToPayments() {
    window.location = 'https://sportfun.co.il/collections/all'
  }

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

        <button style={buttonStyle} onClick={goToPayments}>
          הפרטים נקלטו בהצלחה, לחץ כאן לחזרה לעמוד הקייטנה להשלמת הרישום
          והתשלום.
        </button>
      </main>
    </Container>
  )
}

export default ThankYou
