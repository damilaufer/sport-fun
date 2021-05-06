import React from 'react'
import PropTypes from 'prop-types'
import { Field, Formik, Form } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { CheckboxWithLabel } from 'formik-material-ui'

import {
  otherSchoolId,
  sexes,
  yesNo,
  modiinSettlementId,
} from '../../lib/constants'
import { hasBus } from '../../lib/utils'
import { getValidationSchema } from '../../lib/validations'
import { MyTextField } from '../../components/MyTextField'
import { MySelect } from '../../components/MySelect'
import { MyRadioGroup } from '../../components/MyRadioGroup'
import { Round } from '../../components/Round'

const initialValues = {
  firstName: '' || 'dami',
  lastName: '' || 'laufer',
  sex: '' || 'M',
  motherCellPhone: '' || '054-12312',
  fatherCellPhone: '' || '054-12312',
  phone: '',
  emergencyPhone: '',
  email: '' || 'damilaufer@gmail.com',
  friends: '',
  sportId: '',
  classId: '' || '3',
  schoolId: '' || '2',
  otherSchool: '',
  address: 'Some street 5',
  settlementId: '2',
  neighbourhoodId: '',
  vegetarian: '',
  vegetarianComments: '',
  parkHaMaimSubscriber: '',
  swims: '' || 'Y',
  swimsComments: '',
  comments: '',
  medicalComments: '',
  medicalCommentsYesNo: '' || 'Y',
  firstRound: '' || 'Y',
  busForth: '' || 'Y',
  busForthComments: '' || 'one way',
  lunchId: '' || '2',
  secondRound: '' || 'N',
  secondRoundBus: '',
  secondRoundBusComments: '',
  secondRoundLunchId: '',
  thirdRound: '' || 'N',
  thirdRoundBus: '',
  thirdRoundBusComments: '',
  thirdRoundLunchId: '',
  termsAndConditions: false,
  roundSelected: '', // Special field (not editable)
}

const RegistrationForm = ({ dictionaries, onSubmit }) => {
  const filterAndSort = (items) => {
    return items
      .filter((x) => x.name !== '---')
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  const neighbourhoods = filterAndSort(dictionaries.neighbourhoods)
  // const sports = filterAndSort(dictionaries.sports)
  const classes = filterAndSort(dictionaries.classes)
  const schools = filterAndSort(dictionaries.schools)
  const settlements = filterAndSort(dictionaries.settlements)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema()}
      onSubmit={onSubmit}
    >
      {({ values, errors, submitForm, isSubmitting }) => {
        if (Object.keys(errors).length > 0) {
          console.log('Values:', values)
          console.warn('Errors:', errors)
        } else {
          console.log('No errors')
        }

        const addressRequired = hasBus(
          values.busForth,
          values.secondRoundBus,
          values.thirdRoundBus,
          values.firstRound,
          values.secondRound,
          values.thirdRound,
        )

        const showBusWarning =
          (values.firstRound === 'Y' &&
            values.busForth === 'Y' &&
            values.lunchId === 'Y') ||
          (values.secondRound === 'Y' &&
            values.secondRoundBus === 'Y' &&
            values.secondRoundLunchId === 'Y') ||
          (values.thirdRound === 'Y' &&
            values.thirdRoundBus === 'Y' &&
            values.thirdRoundLunchId === 'Y')

        const settlementNeighbourhoods = neighbourhoods.filter(
          (x) => x.settlementId === values.settlementId,
        )

        return (
          <Form>
            <MyTextField
              label="שם פרטי של הילד/ה"
              name="firstName"
              disabled={isSubmitting}
              required
            />
            <MyTextField
              label="שם משפחה של הילד/ה"
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
            <MyTextField label="טלפון" name="phone" disabled={isSubmitting} />
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
            <MySelect
              label="מסיים כיתה"
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
            {values.schoolId === otherSchoolId && (
              <MyTextField
                label="שם ביה״ס"
                name="otherSchool"
                disabled={isSubmitting}
                required
              />
            )}
            <MyTextField
              label="חברים בקייטנה"
              name="friends"
              disabled={isSubmitting}
            />
            <MyTextField
              label="כתובת"
              name="address"
              disabled={isSubmitting}
              required={addressRequired}
            />
            <MySelect
              label="יישוב"
              name="settlementId"
              items={settlements}
              disabled={isSubmitting}
              required={
                addressRequired && values.settlements === modiinSettlementId
              }
            />
            <MySelect
              label="שכונה"
              name="neighbourhoodId"
              items={settlementNeighbourhoods}
              disabled={isSubmitting || settlementNeighbourhoods.length === 0}
              required={addressRequired}
            />
            <MyRadioGroup
              label="אלרגיה למזון"
              name="vegetarian"
              items={yesNo}
              disabled={isSubmitting}
            />
            <MyTextField
              label="אם כן , לפרט"
              name="vegetarianComments"
              disabled={isSubmitting || values.vegetarian !== 'Y'}
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
              label="הערות לגבי בריכה"
              name="swimsComments"
              disabled={isSubmitting}
            />
            <MyRadioGroup
              label="אין לבני/בתי כל מגבלה רפואית ויכול/ה להשתתף בפעילויות
              ספורט והקייטנה"
              name="medicalCommentsYesNo"
              items={yesNo}
              disabled={isSubmitting}
            />
            <MyTextField
              label="הערות רפואיות"
              name="medicalComments"
              disabled={isSubmitting}
            />
            <Round
              values={values}
              roundLabel="מחזור ראשון (4/7 - 15/7)"
              roundName="firstRound"
              busName="busForth"
              lunchName="lunchId"
              disabled={isSubmitting}
            />

            <Round
              values={values}
              roundLabel="מחזור שני (18/7 - 29/7)"
              roundName="secondRound"
              busName="secondRoundBus"
              lunchName="secondRoundLunchId"
              disabled={isSubmitting}
            />

            <Round
              values={values}
              roundLabel="מחזור שלישי (1/8 - 12/8)"
              roundName="thirdRound"
              busName="thirdRoundBus"
              lunchName="thirdRoundLunchId"
              disabled={isSubmitting}
            />
            <span className="MuiFormHelperText-root Mui-error Mui-required">
              {errors.roundSelected}
            </span>

            <MyTextField
              label="הערות כלליות"
              name="comments"
              disabled={isSubmitting}
            />

            {showBusWarning && (
              <h3 style={{ color: 'red' }}>אין הסעה חזור ב 16:00</h3>
            )}

            <div style={{ marginBottom: '20px' }}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="termsAndConditions"
                Label={{
                  label: (
                    <span>
                      אני מאשר/ת כי כל הפרטים נכונים ומאשר/ת את רישום בני/בתי
                      לקייטנה לאחר שקראתי את כל הפרטים והתנאים המופיעים בדף
                      המידע להורים{' '}
                      <a
                        href="http://sportfun.co.il"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        באתר הקייטנה
                      </a>
                    </span>
                  ),
                }}
              />
              <span className="MuiFormHelperText-root Mui-error Mui-required">
                {errors.termsAndConditions}
              </span>
            </div>

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
  )
}

RegistrationForm.propTypes = {
  dictionaries: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export { RegistrationForm }
// @@@ a veces no se ven en rojo los errores
// @@@ Hacer desaparecer los comentarios de los YESNO que hacen disable (ejemplo: asaa, vegetarian)
// @@@ Borrar el barrio si cambia a NO-modiin (hoy no lo muestra, pero está)
