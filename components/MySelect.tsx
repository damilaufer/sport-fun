import { FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { Field, useField } from 'formik'
import { Select } from 'formik-material-ui'

interface IProps {
  label: string
  name: string
  items: { id: string | number; name: string }[]
  disabled?: boolean
  fullWidth?: boolean
  required?: boolean
  onChange?: (value: string | number) => void
}
const MySelect = ({
  label,
  name,
  items,
  disabled,
  fullWidth = true,
  required,
  onChange,
}: IProps) => {
  const [{}, { error }, { setValue }] = useField(name)

  const handleChange = (ev) => {
    const value = ev.target.value
    setValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  const finalLabel = required ? `${label}*` : label
  return (
    <FormControl
      fullWidth={fullWidth}
      disabled
      style={{ height: '68px', marginBottom: '20px' }}
    >
      <InputLabel htmlFor={name}>{finalLabel}</InputLabel>
      <Field
        component={Select}
        name={name}
        disabled={disabled}
        inputProps={{ id: name }}
        required
        onChange={handleChange}
      >
        {items.map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {x.name}
          </MenuItem>
        ))}
      </Field>
      <span className="MuiFormHelperText-root Mui-error Mui-required">
        {error}
      </span>
    </FormControl>
  )
}

export { MySelect }
