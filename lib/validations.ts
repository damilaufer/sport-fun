import * as Yup from 'yup'

import { modiinSettlementId, otherSchoolId } from '../lib/constants'
import { hasBus } from '../lib/utils'
import './validationFunctions'

// declaration to allow Typescript to understand the new function
declare module 'yup' {
  interface StringSchema {
    isValidPhone(validLengths: number[]): this
  }
}

const getValidationSchema = () => {
  const validationSchema = {
    firstName: Yup.string().required('שדה חובה'),
    lastName: Yup.string().required('שדה חובה'),
    sex: Yup.string().required('שדה חובה'),
    motherCellPhone: Yup.string().required('שדה חובה').isValidPhone([10]),
    fatherCellPhone: Yup.string().isValidPhone([10]),
    phone: Yup.string().isValidPhone([9, 10]),
    emergencyPhone: Yup.string().isValidPhone([9, 10]),
    email: Yup.string().required('שדה חובה').email('כתובת לא חוקית'),
    address: Yup.string().when(
      [
        'busForth',
        'secondRoundBus',
        'thirdRoundBus',
        'firstRound',
        'secondRound',
        'thirdRound',
      ],
      {
        is: hasBus,
        then: Yup.string().required('שדה חובה'),
      },
    ),
    settlementId: Yup.string().when(
      [
        'busForth',
        'secondRoundBus',
        'thirdRoundBus',
        'firstRound',
        'secondRound',
        'thirdRound',
      ],
      {
        is: hasBus,
        then: Yup.string().required('שדה חובה'),
      },
    ),
    neighbourhoodId: Yup.string().when(
      [
        'busForth',
        'secondRoundBus',
        'thirdRoundBus',
        'firstRound',
        'secondRound',
        'thirdRound',
        'settlementId',
      ],
      {
        is: (
          busForth,
          secondRoundBus,
          thirdRoundBus,
          firstRound,
          secondRound,
          thirdRound,
          settlementId,
        ) =>
          hasBus(
            busForth,
            secondRoundBus,
            thirdRoundBus,
            firstRound,
            secondRound,
            thirdRound,
          ) && settlementId === modiinSettlementId,
        then: Yup.string().required('שדה חובה'),
      },
    ),
    classId: Yup.string().required('שדה חובה'),
    schoolId: Yup.number().required('שדה חובה'),
    otherSchool: Yup.string().when('schoolId', {
      is: otherSchoolId,
      then: Yup.string().required('שדה חובה'),
    }),
    vegetarianComments: Yup.string().when('vegetarian', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    swims: Yup.string().required('שדה חובה'),
    parkHaMaimSubscriber: Yup.string().required('שדה חובה'),
    parkHaMaimSubscriberName: Yup.string().when('parkHaMaimSubscriber', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    parkHaMaimSubscriberId: Yup.string().when('parkHaMaimSubscriber', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),

    groupRegistration: Yup.string().required('שדה חובה'),
    groupRegistrationName: Yup.string().when('groupRegistration', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    groupRegistrationCode: Yup.string().when('groupRegistration', {
      is: 'Y',
      then: Yup.string()
        .required('שדה חובה')
        .oneOf(['141414', '103103', '121212'], 'קוד לא קיים'),
    }),

    firstRound: Yup.string().required('שדה חובה'),
    secondRound: Yup.string().required('שדה חובה'),
    thirdRound: Yup.string().required('שדה חובה'),
    medicalCommentsYesNo: Yup.string().required('שדה חובה'),
    medicalComments: Yup.string().when('medicalCommentsYesNo', {
      is: 'N',
      then: Yup.string().required('שדה חובה'),
    }),

    // First round
    busForth: Yup.string().when('firstRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    lunchId: Yup.string().when('firstRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    // seconds round
    secondRoundBus: Yup.string().when('secondRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    secondRoundLunchId: Yup.string().when('secondRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    // Third round
    thirdRoundBus: Yup.string().when('thirdRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    thirdRoundLunchId: Yup.string().when('thirdRound', {
      is: 'Y',
      then: Yup.string().required('שדה חובה'),
    }),
    termsAndConditions: Yup.boolean().oneOf([true], 'חובה לקרוא ולאשר'),

    roundSelected: Yup.string().when(
      ['firstRound', 'secondRound', 'thirdRound'],
      {
        is: (firstRound, secondRound, thirdRound) =>
          firstRound === 'N' && secondRound === 'N' && thirdRound === 'N',
        then: Yup.string().required('צריך לבחור מחזור אחד לפחות'),
      },
    ),
  }

  return Yup.object(validationSchema)
}

export { getValidationSchema }
