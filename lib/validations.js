import * as Yup from 'yup'

const otherSchoolId = '18'

const getValidationSchema = () => {
  const validationSchema = {
    firstName: Yup.string().required('שדה חובה'),
    lastName: Yup.string().required('שדה חובה'),
    motherCellPhone: Yup.string().required('שדה חובה'),
    fatherCellPhone: Yup.string().required('שדה חובה'),
    email: Yup.string().required('שדה חובה').email('כתובת לא חוקית'),
    classId: Yup.string().required('שדה חובה'),
    schoolId: Yup.string().required('שדה חובה'),
    otherSchool: Yup.string().when('schoolId', {
      is: otherSchoolId,
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
    // @@@ falta hacer que por lo menos un majzor sea obligatorio
  }

  return Yup.object(validationSchema)
}

export { getValidationSchema }
