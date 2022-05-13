import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'

const buttonStyle = {
  marginTop: '50px',
  padding: '20px',
  border: '2px solid #2D6BB5',
  borderRadius: '10px',
  fontSize: '2em',
  color: '#2D6BB5',
  backgroundColor: 'transparent',
  cursor: 'pointer',
}

const ThankYou = () => {
  const router = useRouter()

  function goToPayments() {
    // Goes to one of the product pages
    window.location = `https://private.invoice4u.co.il/ClearingNew/Invoice4UClearing.aspx?ProductId=${router.query.productId}`
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
          פרטים נקלטו בהצלחה.
          <br />
          לחץ כאן למעבר לדף התשלום
        </button>
      </main>
    </Container>
  )
}

export default ThankYou
