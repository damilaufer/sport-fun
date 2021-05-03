import * as Yup from 'yup'

const getValidationSchema = () => {
  const validationSchema = {
    firstName: Yup.string().required('שדה חובה'),
    lastName: Yup.string().required('שדה חובה'),
    motherCellPhone: Yup.string().required('שדה חובה'),
    fatherCellPhone: Yup.string().required('שדה חובה'),
    email: Yup.string().required('שדה חובה').email('כתובת לא חוקית'),
    classId: Yup.string().required('שדה חובה'),
    schoolId: Yup.string().required('שדה חובה'),
    swims: Yup.string().required('שדה חובה'),
    firstRound: Yup.string().required('שדה חובה'),
    secondRound: Yup.string().required('שדה חובה'),
    thirdRound: Yup.string().required('שדה חובה'),
  }

  return Yup.object(validationSchema)
}

export { getValidationSchema }
