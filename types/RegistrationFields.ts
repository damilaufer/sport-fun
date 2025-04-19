type RegistrationFields = {
  form: 'manui' | 'group' | ''
  firstName: string
  lastName: string
  sex: 'M' | 'F'
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
  firstRound: 'Y' | 'N'
  busForth: 'Y' | 'N'
  busForthComments: string
  lunchId: 'Y' | 'N'
  busStop: string
  secondRound: 'Y' | 'N'
  secondRoundBus: 'Y' | 'N'
  secondRoundBusComments: string
  secondRoundLunchId: 'Y' | 'N'
  thirdRound: 'Y' | 'N'
  thirdRoundBus: 'Y' | 'N'
  thirdRoundBusComments: string
  thirdRoundLunchId: 'Y' | 'N'
  termsAndConditions: boolean
  roundSelected: string
  busPaid: boolean
  amount: number
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
