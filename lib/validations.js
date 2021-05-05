import * as Yup from 'yup'

import { otherSchoolId } from '../lib/constants'
import { hasBus } from '../lib/utils'

const getValidationSchema = () => {
  const validationSchema = {
    firstName: Yup.string().required('שדה חובה'),
    lastName: Yup.string().required('שדה חובה'),
    sex: Yup.string().required('שדה חובה'),
    motherCellPhone: Yup.string().required('שדה חובה'),
    fatherCellPhone: Yup.string().required('שדה חובה'),
    email: Yup.string().required('שדה חובה').email('כתובת לא חוקית'),
    address: Yup.string().when(
      ['busForth', 'secondRoundBus', 'thirdRoundBus'],
      {
        is: hasBus,
        then: Yup.string().required('שדה חובה'),
      },
    ),
    settlementId: Yup.string().when(
      ['busForth', 'secondRoundBus', 'thirdRoundBus'],
      {
        is: hasBus,
        then: Yup.string().required('Required'),
      },
    ),
    neighbourhoodId: Yup.string().when(
      ['busForth', 'secondRoundBus', 'thirdRoundBus'],
      {
        is: hasBus,
        then: Yup.string().required('Required'),
      },
    ),

    classId: Yup.string().required('שדה חובה'),
    schoolId: Yup.string().required('שדה חובה'),
    otherSchool: Yup.string().when('schoolId', {
      is: otherSchoolId,
      then: Yup.string().required('Required'),
    }),
    vegetarianComments: Yup.string().when('vegetarian', {
      is: 'Y',
      then: Yup.string().required('Required'),
    }),
    swims: Yup.string().required('שדה חובה'),
    firstRound: Yup.string().required('שדה חובה'),
    secondRound: Yup.string().required('שדה חובה'),
    thirdRound: Yup.string().required('שדה חובה'),
    medicalCommentsYesNo: Yup.string().required('שדה חובה'),
    medicalComments: Yup.string().when('medicalCommentsYesNo', {
      is: 'N',
      then: Yup.string().required('Required'),
    }),

    // First round
    busForth: Yup.string().when('firstRound', {
      is: 'Y',
      then: Yup.string().required('Required'),
    }),
    lunchId: Yup.string().when('firstRound', {
      is: 'Y',
      then: Yup.string().required('Required'),
    }),
    // seconds round
    secondRoundBus: Yup.string().when('secondRound', {
      is: 'Y',
      then: Yup.string().required('Required'),
    }),
    secondRoundLunchId: Yup.string().when('secondRound', {
      is: 'Y',
      then: Yup.string().required('Required'),
    }),
    // Third round
    thirdRoundBus: Yup.string().when('thirdRound', {
      is: 'Y',
      then: Yup.string().required('Required'),
    }),
    thirdRoundLunchId: Yup.string().when('thirdRound', {
      is: 'Y',
      then: Yup.string().required('Required'),
    }),
    termsAndConditions: Yup.boolean().oneOf([true], 'חובה לקרוא ולאשר'),

    // @@@ falta hacer que por lo menos un majzor sea obligatorio
  }

  return Yup.object(validationSchema)
}

export { getValidationSchema }
