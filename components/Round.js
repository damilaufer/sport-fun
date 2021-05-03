import React from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core'

import { yesNo } from '../lib/constants'
import { MyRadioGroup } from './MyRadioGroup'
import { MyTextField } from './MyTextField'

const Round = ({
  values,
  roundLabel,
  roundName,
  busName,
  lunchName,
  disabled,
}) => {
  return (
    <Accordion
      elevation={4}
      expanded={values[roundName] === 'Y'}
      style={{ marginBottom: '20px' }}
    >
      <AccordionSummary>
        <MyRadioGroup
          label={roundLabel}
          name={roundName}
          items={yesNo}
          disabled={disabled}
        />
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block' }}>
        <MyRadioGroup
          label="הסעה"
          name={busName}
          items={yesNo}
          disabled={disabled}
        />
        <MyTextField
          label="הערות"
          name={`${busName}Comments`}
          disabled={disabled || values[busName] !== 'Y'}
          helperText="למשל: רק הלוך"
        />
        <MyRadioGroup
          label="צהרון"
          name={lunchName}
          items={yesNo}
          disabled={disabled}
        />
      </AccordionDetails>
    </Accordion>
  )
}

Round.propTypes = {
  values: PropTypes.object.isRequired,
  roundLabel: PropTypes.string.isRequired,
  roundName: PropTypes.string.isRequired,
  busName: PropTypes.string.isRequired,
  lunchName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

export { Round }
