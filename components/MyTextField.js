import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'

const MyTextField = (params) => (
  <div style={{ marginBottom: '20px' }}>
    <Field
      component={TextField}
      fullWidth
      style={{ marginBottom: '20px' }}
      {...params}
    />
  </div>
)

export { MyTextField }
