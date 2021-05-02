import Head from 'next/head';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { Formik, Form, Field } from 'formik';
import {
  Button,
  LinearProgress,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { TextField, RadioGroup } from 'formik-material-ui';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
              }, 500);
            }}
          >
            {({ values, submitForm, isSubmitting }) => {
              console.log(values);
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
                  <Field
                    component={TextField}
                    label="מין"
                    name="sex"
                    fullWidth
                  />
                  <Field component={RadioGroup} name="מין">
                    <FormControlLabel
                      value="M"
                      control={<Radio disabled={isSubmitting} />}
                      label="זכר"
                      disabled={isSubmitting}
                    />
                    <FormControlLabel
                      value="F"
                      control={<Radio disabled={isSubmitting} />}
                      label="נקבה"
                      disabled={isSubmitting}
                    />
                  </Field>
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
                  <Field
                    component={TextField}
                    label="ספורט"
                    name="sportId"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label="כיתה"
                    name="classId"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label={'ביה"ס'}
                    name="schoolId"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label="כתובת"
                    name="address"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label="יישוב"
                    name="settlementId"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label="שכונה"
                    name="neighbourhoodId"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label="צמחוני"
                    name="vegetarian"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label="מנוי לפארק המים"
                    name="parkHaMaimSubscriber"
                    fullWidth
                  />
                  <Field
                    component={TextField}
                    label="יודע לשחות"
                    name="swims"
                    fullWidth
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
              );
            }}
          </Formik>
        </main>
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
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
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
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
      </div>
    </ThemeProvider>
  );
}
