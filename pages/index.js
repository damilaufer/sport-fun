import Head from 'next/head'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Image from 'next/image'
import { create } from 'jss'
import rtl from 'jss-rtl'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'
import { Formik, Form, Field } from 'formik'
import { Button, Container, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

import { MyRadioGroup } from '../components/MyRadioGroup'
import { MySelect } from '../components/MySelect'
import { getValidationSchema } from '../lib/validations'
import { Round } from '../components/Round'
import { sexes, yesNo } from '../lib/constants'
import { MyTextField } from '../components/MyTextField'

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] })
const theme = createMuiTheme({
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

const initialValues = {
  firstName: '',
  lastName: '',
  sex: '',
  motherCellPhone: '',
  fatherCellPhone: '',
  phone: '',
  emergencyPhone: '',
  email: '',
  friends: '',
  sportId: '',
  classId: '',
  schoolId: '',
  address: '',
  settlementId: '',
  neighbourhoodId: '',
  vegetarian: '',
  parkHaMaimSubscriber: '',
  swims: '',
  comments: '',
  firstRound: '',
  busForth: '',
  busForthComments: '',
  lunchId: '',
  secondRound: '',
  secondRoundBus: '',
  secondRoundBusComments: '',
  secondRoundLunchId: '',
  thirdRound: '',
  thirdRoundBus: '',
  thirdRoundBusComments: '',
  thirdRoundLunchId: '',
}

const filterAndSort = (items) => {
  return items
    .filter((x) => x.name !== '---')
    .sort((a, b) => a.name.localeCompare(b.name))
}

function Home({ dictionaries }) {
  console.log(dictionaries)

  const neighbourhoods = filterAndSort(dictionaries.neighbourhoods)
  // const sports = filterAndSort(dictionaries.sports)
  const classes = filterAndSort(dictionaries.classes)
  const schools = filterAndSort(dictionaries.schools)
  const settlements = filterAndSort(dictionaries.settlements)

  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Head>
            <title>Sport-Fun</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <div style={{ marginBottom: '20px' }}>
              <Image src="/logo.jpg" alt="Sport-fun" width="350" height="200" />
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={getValidationSchema()}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false)
                  alert(JSON.stringify(values, null, 2))
                }, 5000)
              }}
            >
              {({ values, errors, submitForm, isSubmitting }) => {
                console.log('Values:', values)
                if (errors) {
                  console.warn('Errors:', errors)
                }

                return (
                  <Form>
                    <MyTextField
                      label="שם פרטי"
                      name="firstName"
                      disabled={isSubmitting}
                      required
                    />
                    <MyTextField
                      label="שם משפחה"
                      name="lastName"
                      disabled={isSubmitting}
                      required
                    />
                    <MyRadioGroup
                      label="מין"
                      name="sex"
                      items={sexes}
                      disabled={isSubmitting}
                    />

                    <MyTextField
                      label="נייד הורה 1"
                      name="motherCellPhone"
                      disabled={isSubmitting}
                      required
                    />
                    <MyTextField
                      label="נייד הורה 2"
                      name="fatherCellPhone"
                      disabled={isSubmitting}
                      required
                    />
                    <MyTextField
                      label="טלפון"
                      name="phone"
                      disabled={isSubmitting}
                    />
                    <MyTextField
                      label="חירום"
                      name="emergencyPhone"
                      disabled={isSubmitting}
                    />
                    <MyTextField
                      label="אימייל"
                      name="email"
                      type="email"
                      disabled={isSubmitting}
                      required
                    />
                    <MyTextField
                      label="חברים בקייטנה"
                      name="friends"
                      disabled={isSubmitting}
                    />
                    {/* <MySelect
                      label="ספורט"
                      name="sportId"
                      items={sports}
                    /> */}
                    <MySelect
                      label="כיתה"
                      name="classId"
                      items={classes}
                      disabled={isSubmitting}
                      required
                    />
                    <MySelect
                      label={'ביה"ס'}
                      name="schoolId"
                      items={schools}
                      disabled={isSubmitting}
                      required
                    />
                    <MyTextField
                      label="כתובת"
                      name="address"
                      disabled={isSubmitting}
                    />
                    <MySelect
                      label="יישוב"
                      name="settlementId"
                      items={settlements}
                      disabled={isSubmitting}
                    />
                    <MySelect
                      label="שכונה"
                      name="neighbourhoodId"
                      items={neighbourhoods.filter(
                        (x) => x.settlementId === values.settlementId,
                      )}
                      disabled={isSubmitting || neighbourhoods.length === 0}
                    />
                    <MyRadioGroup
                      label="צמחוני"
                      name="vegetarian"
                      items={yesNo}
                      disabled={isSubmitting}
                    />
                    <MyRadioGroup
                      label="מנוי לפארק המים"
                      name="parkHaMaimSubscriber"
                      items={yesNo}
                      disabled={isSubmitting}
                    />
                    <MyRadioGroup
                      label="יודע לשחות"
                      name="swims"
                      items={yesNo}
                      disabled={isSubmitting}
                      required
                    />
                    <MyTextField
                      label="הערות"
                      name="comments"
                      disabled={isSubmitting}
                    />
                    <Round
                      values={values}
                      roundLabel="מחזור ראשון (1/4 עד 5/4)"
                      roundName="firstRound"
                      busName="busForth"
                      lunchName="lunchId"
                      disabled={isSubmitting}
                    />

                    <Round
                      values={values}
                      roundLabel="מחזור שני (6/4 עד 10/4)"
                      roundName="secondRound"
                      busName="secondRoundBus"
                      lunchName="secondRoundLunchId"
                      disabled={isSubmitting}
                    />

                    <Round
                      values={values}
                      roundLabel="מחזור שלישי (12/4 עד 15/4)"
                      roundName="thirdRound"
                      busName="thirdRoundBus"
                      lunchName="thirdRoundLunchId"
                      disabled={isSubmitting}
                    />

                    {isSubmitting && <LinearProgress />}
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Submit
                    </Button>
                  </Form>
                )
              }}
            </Formik>
          </main>

          <style jsx>{`
            main {
              padding: 5rem 0;
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
        </Container>
      </ThemeProvider>
    </StylesProvider>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://summer-camp-manager.herokuapp.com/api/dictionaries`,
  )
  const dictionaries = await res.json()

  // Pass data to the page via props
  return { props: { dictionaries } }
}

export default Home
// @@@ school: hay un campo "ajer". Si se elige ese, se puede completar a mano
// tzaaron: yes no?
