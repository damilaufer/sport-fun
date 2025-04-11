import Head from 'next/head'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { create } from 'jss'
import rtl from 'jss-rtl'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
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
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [showPaymentFrame, setShowPaymentFrame] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values }),
      })
      const json = await response.json() // parses JSON response into native JavaScript objects
      setSubmitting(false)

      // Check if payment redirect URL exists
      if (json.paymentRedirectUrl) {
        // Set the payment URL and show the iframe
        setPaymentUrl(json.paymentRedirectUrl);
        setShowPaymentFrame(true);
        setRegistrationComplete(true);
        // Don't redirect to thank you page yet - we'll do that after payment
      } else if (json.kid && json.rounds) {
        // No payment needed, go directly to thank you page
        router.push({
          pathname: '/thankYou',
          query: router.query,
        });
      } else {
        console.log(json);
        throw new Error('The save operation failed: unknown response schema');
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
    setShowPaymentFrame(false);
    router.push({
      pathname: '/thankYou',
      query: router.query,
    });
  }

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Container maxWidth={showPaymentFrame ? "md" : "sm"}>
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>אנא השלם את התשלום</h2>
                <div style={{ position: 'relative', width: '150%', height: '600px', border: '0px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
                  <iframe 
                    src={paymentUrl}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
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

  // const res = await fetch(
  //   `https://summer-camp-manager.herokuapp.com/api/dictionaries`,
  // )
  // const dictionaries = await res.json()
  // Use hardcoded dictionary data instead of fetching from API
  const dictionaries = {
    "groups":[{"id":-1,"name":"---","madrich":"Z"},{"id":1,"name":"2008","madrich":"A"},{"id":2,"name":"2009","madrich":"B"},{"id":17,"name":"2010","madrich":"C"},{"id":18,"name":"2011","madrich":"מדריך"},{"id":19,"name":"2012","madrich":"D"},{"id":21,"name":"2013","madrich":"E"},{"id":22,"name":"2014","madrich":"F"},{"id":23,"name":"2015","madrich":"G"},{"id":24,"name":"2016","madrich":"H"},{"id":25,"name":"2017","madrich":"I"},{"id":26,"name":"2018","madrich":"J"},{"id":27,"name":"2019","madrich":"K"},{"id":28,"name":"2020","madrich":"L"},{"id":29,"name":"2022","madrich":"M"},{"id":30,"name":"2024","madrich":"N"}],
    "neighbourhoods":[{"id":0,"name":"---","settlementId":0},{"id":1,"name":"שמשוני","settlementId":1},{"id":2,"name":"קייזר","settlementId":1},{"id":3,"name":"גבעה C","settlementId":1},{"id":4,"name":"בוכמן","settlementId":1},{"id":5,"name":"הפרחים","settlementId":1},{"id":6,"name":"מליבו","settlementId":1},{"id":7,"name":"מרכז העיר","settlementId":1},{"id":8,"name":"*** אחר ***","settlementId":1},{"id":9,"name":"כרמים","settlementId":1},{"id":10,"name":"ציפורים","settlementId":1},{"id":11,"name":"נופים","settlementId":1},{"id":12,"name":"מורשת","settlementId":1}],
    "sports":[{"id":0,"name":"---"},{"id":1,"name":"כדורגל"},{"id":2,"name":"כדורסל"},{"id":3,"name":"טניס"},{"id":4,"name":"התעמלות קרקע"},{"id":5,"name":"מחול אירובי"},{"id":6,"name":"ג'ודו"},{"id":7,"name":"קפוארה"},{"id":8,"name":"קראטה"},{"id":9,"name":"כדורעף"},{"id":11,"name":"ברייק דאנס"}],
    "settlements":[{"id":0,"name":"---"},{"id":1,"name":"מודיעין"},{"id":2,"name":"רעות"},{"id":3,"name":"מכבים"},{"id":4,"name":"כפר אורנים"},{"id":5,"name":"לפיד"},{"id":6,"name":"*** אחר ***"}],
    "schools":[{"id":0,"name":"---"},{"id":1,"name":"אופק"},{"id":2,"name":"ניצנים"},{"id":3,"name":"נתיב זבולון"},{"id":4,"name":"האלה"},{"id":5,"name":"רמון"},{"id":6,"name":"אסיף"},{"id":7,"name":"עידנים"},{"id":8,"name":"היובל"},{"id":9,"name":"דמוקרטי"},{"id":10,"name":"יחד"},{"id":11,"name":"משואות נריה"},{"id":12,"name":"קשת"},{"id":13,"name":"רעים"},{"id":14,"name":"מעוז המכבים"},{"id":15,"name":"עמית"},{"id":16,"name":"אור - כפר אורנים"},{"id":17,"name":"לפיד"},{"id":18,"name":"*** אחר ***"},{"id":19,"name":"דורות"},{"id":20,"name":"חוט השני"},{"id":21,"name":"יזמ'ה"},{"id":22,"name":"אלונים"},{"id":24,"name":"אבני חן"},{"id":25,"name":"מוריה"},{"id":26,"name":"שבטי ישראל"},{"id":27,"name":"בן שמן"},{"id":28,"name":"ממד אריאל"},{"id":29,"name":"כרמים"},{"id":30,"name":"דרכי יהודה"},{"id":31,"name":"בית ספר חדש"},{"id":32,"name":"ענבלים"},{"id":33,"name":"שיבולים"},{"id":34,"name":"אבני החושן"},{"id":35,"name":"חופים"}],
    "reportTypes":[{"id":1,"name":"By kid"},{"id":2,"name":"By totals"}],
    "lunchTypes":[{"id":0,"name":"---"},{"id":1,"name":"לא"},{"id":3,"name":"כן"}],
    "configuration":[{"name":"currentGroup","value":"30"},{"name":"Database","value":"REMOTE"},{"name":"DbVersion","value":"2"}],
    "classes":[{"id":0,"name":"---"},{"id":1,"name":" גן חובה"},{"id":2,"name":"א"},{"id":3,"name":"ב"},{"id":4,"name":"ג"},{"id":5,"name":"ד"},{"id":6,"name":"ה"},{"id":7,"name":"ו"},{"id":8,"name":"ז"},{"id":9,"name":"ח"}],
    "reportColumns":[{"id":19,"name":"FName","caption":"First name","type":"String","reportId":12},{"id":20,"name":"LName","caption":"Last name","type":"String","reportId":12},{"id":21,"name":"BusStop","caption":"Bus stop","type":"String","reportId":12},{"id":22,"name":"ID","caption":"ID","type":"Int32","reportId":12},{"id":23,"name":"FName","caption":"First name","type":"String","reportId":13},{"id":24,"name":"LName","caption":"Last name","type":"String","reportId":13},{"id":25,"name":"BusPaid","caption":"Bus paid","type":"Boolean","reportId":13},{"id":26,"name":"ID","caption":"ID","type":"Int32","reportId":13},{"id":27,"name":"GRP_ID","caption":"Group","type":"Int32","reportId":13}],
    "reports":[{"id":4,"name":"ספורט","reportType":1,"spName":null,"xsltFilename":"Kids sport","internal":0,"minUrlId":2},{"id":5,"name":"רשימה מלאה","reportType":1,"spName":null,"xsltFilename":"Kids full list","internal":0,"minUrlId":2},{"id":6,"name":"צהרון","reportType":1,"spName":null,"xsltFilename":"Kids tzaaron","internal":0,"minUrlId":2},{"id":7,"name":"קייטגן","reportType":1,"spName":null,"xsltFilename":"Kids keitagan","internal":0,"minUrlId":2},{"id":11,"name":"כיתה-בי\"ס","reportType":1,"spName":null,"xsltFilename":"Kids kita-school","internal":0,"minUrlId":2},{"id":14,"name":"סה\"כ לפי בי\"ס","reportType":2,"spName":"usp_Report_TotalsBySchool","xsltFilename":"Totals by school","internal":0,"minUrlId":2},{"id":15,"name":"כספים","reportType":1,"spName":null,"xsltFilename":"Kids financial","internal":0,"minUrlId":2},{"id":17,"name":"הסעות","reportType":1,"spName":null,"xsltFilename":"Kids bus","internal":0,"minUrlId":2}]
  };

  // Pass data to the page via props
  return { props: { dictionaries } }
}

export default register
