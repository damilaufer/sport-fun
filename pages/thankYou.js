import { Container } from '@material-ui/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

const styles = {
  main: { textAlign: 'center', padding: '3rem 0 5rem 0' },
  image: { marginBottom: '20px' },
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
        <div className="logo-container" style={styles.image}>
          <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
        </div>

        <div
          className="success-card animate-success"
          style={{ marginTop: '40px', cursor: 'pointer' }}
          onClick={goToPayments}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#4CAF50',
              marginBottom: '16px',
            }}
          >
            פרטי הרישום נקלטו בהצלחה.
          </div>
          <div style={{ fontSize: '20px', color: '#333', lineHeight: 1.6 }}>
            <b>
              על מנת להשלים את הרישום ולהבטיח את מקומכם בקייטנה יש להסדיר תשלום
              מול המשרד
            </b>
          </div>
          <div style={{ marginTop: '20px' }}>
            <a
              href="tel:+972523670576"
              className="btn-primary"
              style={{
                textDecoration: 'none',
                padding: '12px 32px',
                fontSize: '22px',
              }}
            >
              052-3670576
            </a>
          </div>
        </div>
      </main>
    </Container>
  )
}

export default ThankYou
