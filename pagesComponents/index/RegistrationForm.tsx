import { Button, Collapse, LinearProgress } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel } from 'formik-material-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { CSSProperties } from 'react'

import { MyRadioGroup } from '../../components/MyRadioGroup'
import { MySelect } from '../../components/MySelect'
import { MyTextField } from '../../components/MyTextField'
import { Round } from '../../components/Round'
import { Telephone } from '../../components/Telephone'
import { configuration } from '../../configuration'
import { calculatePayment } from '../../lib/calculatePayment'
import {
  modiinSettlementId,
  otherSchoolId,
  sexes,
  yesNo,
} from '../../lib/constants'
import { hasBus } from '../../lib/utils'
import { getValidationSchema } from '../../lib/validations'
import { RegistrationFields } from '../../types/RegistrationFields'

const styles: Record<string, CSSProperties> = {
  title: { color: '#3668AB', textAlign: 'center' },
  termsAndConditions: { marginBottom: '20px' },
  link: { color: '#FA9D16', marginBottom: 20, display: 'block' },
  warning: { color: 'red', fontSize: '20px', marginTop: 10 },
  amountToPay: { color: 'rgba(0, 0, 0, 0.54)', marginBottom: '20px' },
}

const Payments = [
  { name: 'תשלום אחד', id: '1' },
  { name: '2 תשלומים', id: '2' },
  { name: '3 תשלומים', id: '3' },
]

const getInitialValues = (
  isSubscriber: boolean,
  isGroupal: boolean,
): RegistrationFields => ({
  form: isSubscriber ? 'manui' : isGroupal ? 'group' : '',
  firstName: '',
  lastName: 'laufer',
  sex: 'M',
  motherCellPhone: '0542428888',
  fatherCellPhone: '0542428889',
  phone: '0542428890',
  emergencyPhone: '',
  email: 'damilaufer@gmail.com',
  friends: '',
  sportId: 2,
  classId: 1,
  schoolId: 1,
  otherSchool: '',
  address: 'miau 292',
  settlementId: 2,
  neighbourhoodId: 0,
  vegetarian: 'N',
  vegetarianComments: '',
  parkHaMaimSubscriber: isSubscriber ? 'Y' : 'N',
  parkHaMaimSubscriberName: 'xxxxx',
  parkHaMaimSubscriberId: '33',
  groupRegistration: isGroupal ? 'Y' : 'N',
  groupRegistrationName: '',
  groupRegistrationCode: '',
  swims: 'Y',
  swimsComments: '',
  comments: 'comm',
  medicalComments: 'mediccomm',
  medicalCommentsYesNo: 'N',
  firstRound: 'Y',
  busForth: 'Y',
  busForthComments: '',
  lunchId: 'N',
  busStop: '',
  secondRound: 'N',
  secondRoundBus: 'N',
  secondRoundBusComments: '',
  secondRoundLunchId: 'N',
  thirdRound: 'N',
  thirdRoundBus: 'N',
  thirdRoundBusComments: '',
  thirdRoundLunchId: 'N',
  termsAndConditions: false,
  roundSelected: '', // Special field (not editable)
  // non visible fields (to be compatible with the old API)
  busPaid: false,
  amount: 0,
  payments: 1,
  cashPaid: false,
  chequePaid: false,
  ccPaid: true,
  ccNumber: '',
  ccExpiration: '',
  ccOwnerID: '',
  ccOwnerName: '',
  receiptNumber: '',
})

const RegistrationForm = ({ dictionaries, onSubmit }) => {
  const router = useRouter()
  const isSubscriber = router.query.form === 'manui'
  const isGroupal = router.query.form === 'group'

  let title: string
  if (isSubscriber) {
    title = 'למנויי פארק המים רעות בלבד'
  } else if (isGroupal) {
    title = 'לרישום קבוצתי'
  } else {
    title = 'לכלל הנרשמים'
  }

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
      enableReinitialize
      initialValues={getInitialValues(isSubscriber, isGroupal)}
      validationSchema={getValidationSchema()}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        submitForm,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => {
        function clearField(yesNoValue, fieldNameToClear) {
          if (yesNoValue === 'N') {
            setFieldValue(fieldNameToClear, '', false)
            setFieldTouched(fieldNameToClear, true, false)
          }
        }
        const hasErrors = Object.keys(errors).length > 0
        if (hasErrors) {
          console.warn('Errors:', errors)
        }
        // console.log(values)

        // It's ok to modify the object because it will re-render because of the other changes
        values.amount = calculatePayment(values)

        const addressRequired = hasBus(
          values.busForth,
          values.secondRoundBus,
          values.thirdRoundBus,
          values.firstRound,
          values.secondRound,
          values.thirdRound,
        )

        const settlementNeighbourhoods = neighbourhoods.filter(
          (x) => x.settlementId === values.settlementId,
        )

        return (
          <Form>
            <h2 style={styles.title}>טופס הרשמה</h2>
            <h2 style={styles.title}>{title}</h2>

            {!isSubscriber && !isGroupal && (
              <Link
                href={{
                  pathname: '/',
                  query: { ...router.query, form: 'manui' },
                }}
              >
                <a style={styles.link}>
                  במידה ואתם מנויים של פארק המים רעות, לחצו כאן
                </a>
              </Link>
            )}

            {/* <MyRadioGroup
              label="מנוי לפארק המים"
              name="parkHaMaimSubscriber"
              items={yesNo}
              disabled={isSubmitting}
              required
            /> */}
            <Collapse in={values.parkHaMaimSubscriber === 'Y'}>
              <MyTextField
                label="שם ושם משפחה של בעל המנוי"
                name="parkHaMaimSubscriberName"
                disabled={isSubmitting}
                required
              />
              <MyTextField
                label="מספר תעודת זהות של בעל המנוי"
                name="parkHaMaimSubscriberId"
                disabled={isSubmitting}
                required
              />
            </Collapse>

            {/* <MyRadioGroup
              label="הרשמה ברישום קבוצתי"
              name="groupRegistration"
              items={yesNo}
              disabled={isSubmitting}
              required
            /> */}
            <Collapse in={values.groupRegistration === 'Y'}>
              <MyTextField
                label="שם הקבוצה"
                name="groupRegistrationName"
                disabled={isSubmitting}
                required
              />
              <MyTextField
                label="קוד הנחה"
                name="groupRegistrationCode"
                disabled={isSubmitting}
                required
              />
            </Collapse>

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
            <Telephone
              type="tel"
              label="נייד הורה 1"
              name="motherCellPhone"
              disabled={isSubmitting}
              required
            />
            <Telephone
              type="tel"
              label="נייד הורה 2"
              name="fatherCellPhone"
              disabled={isSubmitting}
            />
            <Telephone
              type="tel"
              label="טלפון"
              name="phone"
              disabled={isSubmitting}
            />
            <Telephone
              type="tel"
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
              label="עולה לכיתה"
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
                addressRequired && values.settlementId === modiinSettlementId
              }
              onChange={(value) => {
                // TODO: make it generic. If no neighbours for the new value, clear it
                // Clear the neighbourhood if not modiin
                if (
                  value !== modiinSettlementId &&
                  values.neighbourhoodId !== 0
                ) {
                  setFieldValue('neighbourhoodId', '')
                }

                setFieldValue('busForth', 'N')
                setFieldValue('secondRoundBus', 'N')
                setFieldValue('thirdRoundBus', 'N')
              }}
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
              onChange={(value) => clearField(value, 'vegetarianComments')}
            />
            <MyTextField
              label="אם כן , לפרט"
              name="vegetarianComments"
              disabled={isSubmitting || values.vegetarian !== 'Y'}
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
              label="אין לבני/בתי כל בעיה רפואית המגבילה אותו/ה בפעילות ספורט ובהשתתפות בקייטנה "
              name="medicalCommentsYesNo"
              items={[
                { name: 'אין מגבלה', id: 'Y' },
                { name: 'יש מגבלה (ציין מטה)', id: 'N' },
              ]}
              disabled={isSubmitting}
              onChange={(value) => clearField(value, 'medicalComments')}
            />
            <MyTextField
              label="הערות רפואיות"
              name="medicalComments"
              disabled={isSubmitting}
            />
            <Round
              values={values}
              roundLabel={configuration.rounds[0].label}
              roundName="firstRound"
              busName="busForth"
              lunchName="lunchId"
              disabled={isSubmitting}
              clearField={clearField}
              full={configuration.rounds[0].full}
            />
            <Round
              values={values}
              roundLabel={configuration.rounds[1].label}
              roundName="secondRound"
              busName="secondRoundBus"
              lunchName="secondRoundLunchId"
              disabled={isSubmitting}
              clearField={clearField}
              full={configuration.rounds[1].full}
            />
            <Round
              values={values}
              roundLabel={configuration.rounds[2].label}
              roundName="thirdRound"
              busName="thirdRoundBus"
              lunchName="thirdRoundLunchId"
              disabled={isSubmitting}
              clearField={clearField}
              full={configuration.rounds[2].full}
            />
            <span className="MuiFormHelperText-root Mui-error Mui-required">
              {errors.roundSelected}
            </span>
            <MyTextField
              label="הערות כלליות"
              name="comments"
              disabled={isSubmitting}
            />

            <div style={styles.termsAndConditions}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="ccPaid"
                Label={{
                  label: 'משלם בכרטיס אשראי',
                }}
              />
              {!values.ccPaid && (
                <div className="MuiFormHelperText-root Mui-error Mui-required">
                  נא ליצור קשר עם המשרד על מנת להסדיר את התשלום בתום הרישום
                </div>
              )}
            </div>

            <div style={styles.amountToPay}>סכום לתשלום ₪{values.amount}</div>

            <MySelect
              label="תשלומים"
              name="payments"
              items={Payments}
              disabled={isSubmitting}
              required
            />

            <div style={styles.termsAndConditions}>
              <Field
                component={CheckboxWithLabel}
                type="checkbox"
                name="termsAndConditions"
                Label={{
                  label: (
                    <span>
                      אני מאשר/ת כי כל הפרטים נכונים ומאשר/ת את רישום בני/בתי
                      לקייטנה לאחר שקראתי את כל הפרטים והתנאים המופיעים ב-
                      <a
                        href="https://sportfun.co.il/%d7%9e%d7%99%d7%93%d7%a2-%d7%9c%d7%94%d7%95%d7%a8%d7%99%d7%9d/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'block' }}
                      >
                        דף המידע להורים
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
              הרשם
            </Button>
            {hasErrors && (
              <div style={styles.warning}>יש שגיאה במילוי הטופס</div>
            )}
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
