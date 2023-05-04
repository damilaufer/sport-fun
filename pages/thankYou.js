import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'

const styles = {
  main: { textAlign: 'center', padding: '1rem 0 5rem 0' },
  image: { marginBottom: '20px' },
  button: {
    marginTop: '50px',
    padding: '20px',
    border: '2px solid #2D6BB5',
    borderRadius: '10px',
    fontSize: '26px',
    color: '#2D6BB5',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  warning: { color: '#FA9D16', fontSize: '20px', marginTop: 20 },
}

const ThankYou = () => {
  const router = useRouter()

  function goToPayments() {
    // Goes to one of the product pages
    window.location = `https://private.invoice4u.co.il/newsite/he/clearing/public/i4u-clearing?ProductGuid=${router.query.productId}`
  }

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Sport-Fun</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={styles.main}>
        <div style={styles.image}>
          <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
        </div>

        <button style={styles.button} onClick={goToPayments}>
          פרטי הרישום נקלטו בהצלחה.
          <br />
          <b>
            <u>לחצו כאן</u>
          </b>{' '}
          למעבר לעמוד התשלום המאובטח.
          <div style={styles.warning}>
            יש להקפיד להוסיף לעגלת התשלום את כל הפריטים שנבחרו בדף הרישום.
          </div>
        </button>
      </main>
    </Container>
  )
}

export default ThankYou
