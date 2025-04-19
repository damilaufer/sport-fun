import { Bus, YesNo } from '../types/Round'

const otherSchoolId = 18

const modiinSettlementId = 1
const kfarOranimSettlementId = 4
const lapidSettlementId = 5
const shilatSettlementId = 7

const farAwaySettlements = [
  kfarOranimSettlementId,
  lapidSettlementId,
  shilatSettlementId,
]

const sexes: { name: string; id: 'M' | 'F' }[] = [
  { name: 'זכר', id: 'M' },
  { name: 'נקבה', id: 'F' },
]

const yesNo: { name: string; id: YesNo }[] = [
  { name: 'לא', id: 'N' },
  { name: 'כן', id: 'Y' },
]

const yesNoOneWay: { name: string; id: Bus }[] = [
  { name: 'לא', id: 'N' },
  { name: 'הלוך חזור  ', id: 'Y' },
  { name: 'כוון אחד בלבד', id: '1Way' },
]

export {
  farAwaySettlements,
  modiinSettlementId,
  otherSchoolId,
  sexes,
  yesNo,
  yesNoOneWay,
}
