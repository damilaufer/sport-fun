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
      expanded={values[roundName] === 'Y'}
      style={{ marginBotom: '20px' }}
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
        <div>
          <MyRadioGroup
            label="הסעה"
            name={busName}
            items={yesNo}
            disabled={disabled}
          />
        </div>
        <div>
          <MyTextField
            label="הערות"
            name={`${busName}Comments`}
            disabled={disabled || values[busName] !== 'Y'}
            helperText="למשל: רק הלוך"
          />
        </div>
        <div>
          <MyTextField label="צהרון" name={lunchName} disabled={disabled} />
        </div>
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
