import { Container } from '@material-ui/core'
import green from '@material-ui/core/colors/green'
import purple from '@material-ui/core/colors/purple'
import {
  createTheme,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@material-ui/core/styles'
import { create } from 'jss'
import rtl from 'jss-rtl'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { RegistrationForm } from '../pagesComponents/index/RegistrationForm'

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
})

function register({ dictionaries }) {
  const router = useRouter()
  const [paymentUrl, setPaymentUrl] = useState(null)
  const [showPaymentFrame, setShowPaymentFrame] = useState(false)
  const [registrationComplete, setRegistrationComplete] = useState(false)

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const valuesWithForm = { ...values, form: router.query.form }

      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ valuesWithForm }),
      })
      const json = await response.json() // parses JSON response into native JavaScript objects
      setSubmitting(false)

      // Check if payment redirect URL exists
      if (json.paymentRedirectUrl) {
        // Set the payment URL and show the iframe
        setPaymentUrl(json.paymentRedirectUrl)
        setShowPaymentFrame(true)
        setRegistrationComplete(true)
        // Don't redirect to thank you page yet - we'll do that after payment
      } else if (json.kid && json.rounds) {
        // No payment needed, go directly to thank you page
        router.push({
          pathname: '/thankYou',
          query: router.query,
        })
      } else {
        console.log(json)
        throw new Error('The save operation failed: unknown response schema')
      }
    } catch (error) {
      console.error(error)
      // @@@ Falta hacer que en los errores de select y group sean en rojo también los textos
      //@@@ cambiar
      alert('קרתה שגיאה')
    }
  }

  // Function to handle completion of payment
  const handlePaymentComplete = () => {
    setShowPaymentFrame(false)
    router.push({
      pathname: '/thankYou',
      query: router.query,
    })
  }

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Container maxWidth={showPaymentFrame ? 'md' : 'sm'}>
          <Head>
            <title>Sport-Fun</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <div style={{ marginBottom: '20px' }}>
              <Image
                src="/logo.jpg"
                alt="Sport-fun"
                width="350"
                height="200"
                priority="true"
              />
            </div>
            {/* <div style={{ textAlign: 'center' }}>
              <h1>הרישום הסתיים</h1>
              <h2>
                ניתן להירשם לרשימת המתנה{' '}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdUIcrKz3m2S25OkITOc_4ObDLBi8c0tpUx7-efqUuyzk6UIw/viewform?usp=sf_link"
                  rel="noopener noreferrer"
                  style={{ color: 'blue' }}
                >
                  בקישור הזה
                </a>
              </h2>
              <h2>לפרטים: 052-367-0576</h2>
            </div> */}

            {!registrationComplete ? (
              <RegistrationForm
                dictionaries={dictionaries}
                onSubmit={handleSubmit}
              />
            ) : showPaymentFrame && paymentUrl ? (
              <div>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                  אנא השלם את התשלום
                </h2>
                <div
                  style={{
                    position: 'relative',
                    width: '150%',
                    height: '600px',
                    border: '0px solid #ccc',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <iframe
                    src={paymentUrl}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    title="Payment Form"
                  />
                </div>
                {/* <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <button 
                    onClick={handlePaymentComplete}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    סיימתי את התשלום
                  </button>
                </div> */}
              </div>
            ) : null}
          </main>

          <style jsx>{`
            main {
              padding: 1rem 0 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            .title a {
              color: #0070f3;
              text-decoration: none;
            }

            .title a:hover,
            .title a:focus,
            .title a:active {
              text-decoration: underline;
            }

            .title {
              margin: 0;
              line-height: 1.15;
              font-size: 4rem;
              text-align: center;
            }
          `}</style>

          <style jsx global>{`
            html,
            body {
              padding: 0;
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
            }

            * {
              box-sizing: border-box;
            }
          `}</style>

          {/* Material UI overrides */}
          <style jsx global>
            {`
              .MuiFormHelperText-root {
                font-size: 1rem !important;
                color: #f44336;
              }
            `}
          </style>
        </Container>
      </ThemeProvider>
    </StylesProvider>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(
    `https://summer-camp-manager.herokuapp.com/api/dictionaries`,
  )
  const dictionaries = await res.json()

  // Pass data to the page via props
  return { props: { dictionaries } }
}

export default register
