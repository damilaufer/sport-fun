import React from 'react'
import PropTypes from 'prop-types'
import { Formik, Form } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'

import { MyRadioGroup } from '../../components/MyRadioGroup'
import { MySelect } from '../../components/MySelect'
import { getValidationSchema } from '../../lib/validations'
import { Round } from '../../components/Round'
import { sexes, yesNo } from '../../lib/constants'
import { MyTextField } from '../../components/MyTextField'

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
        // console.log('Values:', values)
        if (Object.keys(errors).length > 0) {
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
            <MyTextField label="כתובת" name="address" disabled={isSubmitting} />
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
  )
}

RegistrationForm.propTypes = {
  dictionaries: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export { RegistrationForm }
