import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { Select } from 'formik-material-ui'

const MySelect = ({ label, name, items, disabled, onChange }) => {
  return (
    <FormControl fullWidth disabled>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Field
        component={Select}
        name={name}
        disabled={disabled}
        inputProps={{ id: name }}
      >
        {items.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.name}
          </MenuItem>
        ))}
      </Field>
    </FormControl>
  )
}

MySelect.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

export { MySelect }
