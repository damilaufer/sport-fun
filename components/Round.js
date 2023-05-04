import React from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core'

import { yesNo } from '../lib/constants'
import { MyRadioGroup } from './MyRadioGroup'
// import { MyTextField } from './MyTextField'

const styles = {
  warning: { color: '#FA9D16' },
}

const Round = ({
  values,
  roundLabel,
  roundName,
  busName,
  lunchName,
  disabled,
  clearField,
  full,
}) => {
  const finalDisabled = disabled || full
  const registeredForThisRound = values[roundName] === 'Y'

  const showBusWarning =
    registeredForThisRound &&
    values[busName] === 'Y' &&
    values[lunchName] === 'Y'

  return (
    <Accordion
      elevation={4}
      expanded={registeredForThisRound}
      style={{ marginBottom: '20px' }}
    >
      <AccordionSummary>
        <MyRadioGroup
          label={roundLabel}
          name={roundName}
          items={yesNo}
          disabled={finalDisabled}
        />

        {full && roundName === 'secondRound' && (
          <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            המחזור השני מלא
            <br />. לקבלת קישור לרישום לרשימת המתנה שילחו הודעה ל : 052-3670576
          </span>
        )}
        {full && roundName === 'thirdRound' && (
          <span style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
            המחזור השלישי מלא
            <br />. לקבלת קישור לרישום לרשימת המתנה שילחו הודעה ל : 052-3670576
          </span>
        )}
      </AccordionSummary>
      <AccordionDetails style={{ display: 'block' }}>
        <MyRadioGroup
          label="הסעה"
          name={busName}
          items={yesNo}
          disabled={finalDisabled}
          required={registeredForThisRound}
          onChange={(value) => clearField(value, `${busName}Comments`)}
        />
        {/* <MyTextField
          label="הערות"
          name={`${busName}Comments`}
          disabled={finalDisabled || values[busName] !== 'Y'}
          helperText="למשל: רק הלוך"
        /> */}
        <MyRadioGroup
          label="צהרון"
          name={lunchName}
          items={yesNo}
          disabled={finalDisabled}
          required={registeredForThisRound}
        />
        {showBusWarning && (
          <h3 style={styles.warning}>אין הסעה חזור ב 16:00</h3>
        )}
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
  full: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  clearField: PropTypes.func.isRequired,
}

export { Round }
