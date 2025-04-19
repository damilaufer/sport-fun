import { Container } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

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
}

const ThankYou = () => {
  const router = useRouter()

  function goToPayments() {
    // Goes to one of the product pages
    // const paymentUrl = configuration.getPaymentUrl(router.query.form)
    // window.location = paymentUrl
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
          <br />
          <b>
            על מנת להשלים את הרישום ולהבטיח את מקומכם בקייטנה יש להסדיר תשלום
            מול המשרד
          </b>
          <br />
          <br />
          <a href="tel:+972523670576" style={{ color: '#2D6BB5' }}>
            <b>052-3670576</b>
          </a>
        </button>
      </main>
    </Container>
  )
}

export default ThankYou
