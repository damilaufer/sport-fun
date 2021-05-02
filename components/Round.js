import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'
import { TextField } from 'formik-material-ui'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core'

import { MyRadioGroup } from './MyRadioGroup'
import { yesNo } from '../lib/constants'

const Round = ({ values, roundLabel, roundName, busName, lunchName }) => (
  <Accordion expanded={values[roundName] === 'Y'}>
    <AccordionSummary>
      <MyRadioGroup label={roundLabel} name={roundName} items={yesNo} />
    </AccordionSummary>
    <AccordionDetails>
      <MyRadioGroup label="הסעה" name={busName} items={yesNo} />
      <Field
        component={TextField}
        label="הערות"
        name={`${busName}Comments`}
        disabled={values[busName] !== 'Y'}
        helperText="למשל: רק הלוך"
        fullWidth
      />
      <Field component={TextField} label="צהרון" name={lunchName} fullWidth />
    </AccordionDetails>
  </Accordion>
)

Round.propTypes = {
  values: PropTypes.object.isRequired,
  roundLabel: PropTypes.string.isRequired,
  roundName: PropTypes.string.isRequired,
  busName: PropTypes.string.isRequired,
  lunchName: PropTypes.string.isRequired,
}

export { Round }
