import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'

const MyTextField = ({ label, name, disabled, required }) => (
  <Field
    component={TextField}
    label={label}
    name={name}
    required={required}
    disabled={disabled}
    fullWidth
    style={{ marginBottom: '20px' }}
  />
)

MyTextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}

export { MyTextField }
