import { Container } from '@material-ui/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const styles = {
  main: { textAlign: 'center', padding: '1rem 0 5rem 0' },
  image: { marginBottom: '20px' },
  message: {
    marginTop: '30px',
    padding: '20px',
    border: '2px solid #2D6BB5',
    borderRadius: '10px',
    fontSize: '26px',
    color: '#2D6BB5',
    backgroundColor: 'transparent',
  },
  success: {
    color: '#4CAF50',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  error: {
    color: '#F44336',
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  details: {
    fontSize: '20px',
    marginTop: '20px',
    color: '#333',
  },
}

const RegistrationComplete = () => {
  const router = useRouter()
  console.log('router.query', router.query)
  const [paymentStatus, setPaymentStatus] = useState('processing')
  const [paymentDetails, setPaymentDetails] = useState(null)

  // Process URL parameters when the component mounts
  useEffect(() => {
    if (!router.isReady) return

    // Check for success or error parameters from Invoice4U redirect
    const { success, error, paymentId, clearingLogId } = router.query

    if (success === 'true') {
      setPaymentStatus('success')
      setPaymentDetails({
        paymentId,
        clearingLogId,
        timestamp: new Date().toLocaleString('he-IL'),
      })
    } else if (error) {
      setPaymentStatus('error')
      setPaymentDetails({
        error,
        timestamp: new Date().toLocaleString('he-IL'),
      })
    } else {
      // Default case - we don't have clear status indicators
      setPaymentStatus('unknown')
    }
  }, [router.isReady, router.query])

  const goToHomePage = () => {
    router.push('/')
  }

  return (
    <Container maxWidth="sm">
      <Head>
        <title>Sport-Fun - השלמת הרישום</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={styles.main}>
        <div style={styles.message}>
          {paymentStatus === 'processing' && (
            <>
              <div>מעבד את פרטי התשלום...</div>
            </>
          )}

          {paymentStatus === 'success' && (
            <>
              <div style={styles.success}>הרישום והתשלום הושלמו בהצלחה!</div>
              <div>תודה שנרשמתם ל-Sport-Fun</div>
              {paymentDetails && (
                <div style={styles.details}>
                  <div>מספר אסמכתא: {paymentDetails.clearingLogId}</div>
                  <div>תאריך: {paymentDetails.timestamp}</div>
                </div>
              )}
              <div style={styles.details}>
                אישור רישום נשלח לכתובת המייל שהזנתם
              </div>
            </>
          )}

          {paymentStatus === 'error' && (
            <>
              <div style={styles.error}>אירעה שגיאה בתהליך התשלום</div>
              <div>הרישום נקלט במערכת, אך התשלום לא הושלם</div>
              {paymentDetails?.error && (
                <div style={styles.details}>
                  <div>פרטי השגיאה: {paymentDetails.error}</div>
                  <div>אנא צרו קשר עם צוות Sport-Fun לסיוע</div>
                </div>
              )}
            </>
          )}

          {paymentStatus === 'unknown' && (
            <>
              <div>הרישום התקבל במערכת</div>
              <div style={styles.details}>
                אם ביצעתם תשלום, אנא המתינו לקבלת אישור במייל
              </div>
              <div style={styles.details}>
                אם לא השלמתם את התשלום, אנא צרו קשר עם צוות Sport-Fun
              </div>
            </>
          )}
        </div>
      </main>
    </Container>
  )
}

export default RegistrationComplete
