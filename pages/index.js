import Head from 'next/head'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { create } from 'jss'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import { Formik, Form, Field } from 'formik'
import { Button, Container, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { MyRadioGroup } from '../components/MyRadioGroup'
import { MySelect } from '../components/MySelect'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'

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

const sexs = [
  { name: 'זכר', id: 'M' },
  { name: 'נקבה', id: 'F' },
]
const yesNo = [
  { name: 'לא', id: 'N' },
  { name: 'כן', id: 'Y' },
]

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
  lunchId: '',
  secondRound: '',
  secondRoundBus: '',
  secondRoundLunchId: '',
  thirdRound: '',
  thirdRoundBus: '',
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
        {/* <div className="container"> */}
        <Container maxWidth="sm">
          <Head>
            <title>Sport-Fun</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <main>
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {}
                if (!values.email) {
                  errors.email = 'Required'
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email,
                  )
                ) {
                  errors.email = 'Invalid email address'
                }
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false)
                  alert(JSON.stringify(values, null, 2))
                }, 500)
              }}
            >
              {({ values, submitForm, isSubmitting }) => {
                // console.log(values)

                return (
                  <Form>
                    <Field
                      component={TextField}
                      label="שם פרטי"
                      name="firstName"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="שם משפחה"
                      name="lastName"
                      fullWidth
                    />
                    <MyRadioGroup label="מין" name="sex" items={sexs} />

                    <Field
                      component={TextField}
                      label="נייד אמא"
                      name="motherCellPhone"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="נייד אבא"
                      name="fatherCellPhone"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="טלפון"
                      name="phone"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="חירום"
                      name="emergencyPhone"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="אימייל"
                      name="email"
                      type="email"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="חברים בקייטנה"
                      name="friends"
                      fullWidth
                    />
                    {/* <MySelect
                      label="ספורט"
                      name="sportId"
                      items={sports}
                    /> */}
                    <MySelect label="כיתה" name="classId" items={classes} />
                    <MySelect label={'ביה"ס'} name="schoolId" items={schools} />
                    <Field
                      component={TextField}
                      label="כתובת"
                      name="address"
                      fullWidth
                    />
                    <MySelect
                      label="יישוב"
                      name="settlementId"
                      items={settlements}
                    />
                    <MySelect
                      label="שכונה"
                      name="neighbourhoodId"
                      items={neighbourhoods.filter(
                        (x) => x.settlementId === values.settlementId,
                      )}
                      disabled={neighbourhoods.length === 0}
                    />
                    <MyRadioGroup
                      label="צמחוני"
                      name="vegetarian"
                      items={yesNo}
                    />
                    <MyRadioGroup
                      label="מנוי לפארק המים"
                      name="parkHaMaimSubscriber"
                      items={yesNo}
                    />
                    <MyRadioGroup
                      label="יודע לשחות"
                      name="swims"
                      items={yesNo}
                    />
                    <Field
                      component={TextField}
                      label="הערות"
                      name="comments"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="מחזור ראשון"
                      name="firstRound"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="הסעה"
                      name="busForth"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="צהרון"
                      name="lunchId"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="מחזור שני"
                      name="secondRound"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="הסעה"
                      name="secondRoundBus"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="צהרון"
                      name="secondRoundLunchId"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="מחזור שלישי"
                      name="thirdRound"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="הסעה"
                      name="thirdRoundBus"
                      fullWidth
                    />
                    <Field
                      component={TextField}
                      label="צהרון"
                      name="thirdRoundLunchId"
                      fullWidth
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
          <footer>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by <img src="/vercel.svg" alt="Vercel Logo" />
            </a>
          </footer>

          <style jsx>{`
            .container {
              min-height: 100vh;
              padding: 0 0.5rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            main {
              padding: 5rem 0;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }

            footer {
              width: 100%;
              height: 100px;
              border-top: 1px solid #eaeaea;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            footer img {
              margin-left: 0.5rem;
            }

            footer a {
              display: flex;
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
            }

            .title,
            .description {
              text-align: center;
            }

            .description {
              line-height: 1.5;
              font-size: 1.5rem;
            }

            code {
              background: #fafafa;
              border-radius: 5px;
              padding: 0.75rem;
              font-size: 1.1rem;
              font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                monospace;
            }

            .grid {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;

              max-width: 800px;
              margin-top: 3rem;
            }

            .card {
              margin: 1rem;
              flex-basis: 45%;
              padding: 1.5rem;
              text-align: left;
              color: inherit;
              text-decoration: none;
              border: 1px solid #eaeaea;
              border-radius: 10px;
              transition: color 0.15s ease, border-color 0.15s ease;
            }

            .card:hover,
            .card:focus,
            .card:active {
              color: #0070f3;
              border-color: #0070f3;
            }

            .card h3 {
              margin: 0 0 1rem 0;
              font-size: 1.5rem;
            }

            .card p {
              margin: 0;
              font-size: 1.25rem;
              line-height: 1.5;
            }

            .logo {
              height: 1em;
            }

            @media (max-width: 600px) {
              .grid {
                width: 100%;
                flex-direction: column;
              }
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
