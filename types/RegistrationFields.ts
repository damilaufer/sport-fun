import { Bus, YesNo } from './Round'

type RegistrationFields = {
  form: 'manui' | 'group' | ''
  firstName: string
  lastName: string
  sex: 'M' | 'F' | ''
  motherCellPhone: string
  fatherCellPhone: string
  phone: string
  emergencyPhone: string
  email: string
  friends: string
  sportId: number
  classId: number
  schoolId: number
  otherSchool: string
  address: string
  settlementId: number
  neighbourhoodId: number
  vegetarian: string
  vegetarianComments: string
  parkHaMaimSubscriber: string
  parkHaMaimSubscriberName: string
  parkHaMaimSubscriberId: string
  groupRegistration: string
  groupRegistrationName: string
  groupRegistrationCode: string
  swims: string
  swimsComments: string
  comments: string
  medicalComments: string
  medicalCommentsYesNo: string
  firstRound: YesNo
  busForth: Bus
  busForthComments: string
  lunchId: YesNo
  busStop: string
  secondRound: YesNo
  secondRoundBus: Bus
  secondRoundBusComments: string
  secondRoundLunchId: YesNo
  thirdRound: YesNo
  thirdRoundBus: Bus
  thirdRoundBusComments: string
  thirdRoundLunchId: YesNo
  termsAndConditions: boolean
  roundSelected: string
  busPaid: boolean
  amount: number
  amountDetails: string[]
  payments: number
  cashPaid: boolean
  chequePaid: boolean
  ccPaid: boolean
  ccNumber: string
  ccExpiration: string
  ccOwnerID: string
  ccOwnerName: string
  receiptNumber: string
}

export type { RegistrationFields }
