import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core'
import { useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import { farAwaySettlements, yesNo, yesNoOneWay } from '../lib/constants'
import { MyRadioGroup } from './MyRadioGroup'
import { MySelect } from './MySelect'
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
  disableLunch,
  clearField,
  full,
}) => {
  const { setFieldValue } = useFormikContext()

  const finalDisabled = disabled || full
  const registeredForThisRound = values[roundName] === 'Y'

  const showBusWarning =
    registeredForThisRound &&
    values[busName] === 'Y' &&
    values[lunchName] === 'Y'

  // don't show 1way if it's a far away settlement
  const busItems = farAwaySettlements.includes(values.settlementId)
    ? yesNoOneWay.filter((item) => {
        return item.id !== '1Way'
      })
    : yesNoOneWay

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
          onChange={(value) => {
            if (value === 'N') {
              setFieldValue(busName, 'N')
              setFieldValue(lunchName, 'N')
            }
          }}
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
        <div style={{ width: '50%' }}>
          <MySelect
            label="הסעה"
            name={busName}
            items={busItems}
            disabled={finalDisabled}
            required={registeredForThisRound}
            onChange={(value) => clearField(value, `${busName}Comments`)}
          />
        </div>
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
          disabled={finalDisabled || disableLunch}
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
  disableLunch: PropTypes.bool,
  clearField: PropTypes.func.isRequired,
}

export { Round }
