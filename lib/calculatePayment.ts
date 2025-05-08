import { RegistrationFields } from '../types/RegistrationFields'
import { Bus, YesNo } from '../types/Round'
import { farAwaySettlements } from './constants'

const RoundPrice = 2250
const LunchPrice = 900
const BusPrice = 380
const FarFarAwayBusPrice = 500
const OneWayBusPrice = 220
const NoDiscount = 0.05 // will be 1 after rishum mukdam
const GroupDiscount = 0.1 // will be 0.05 after rishum mukdam
const ManuiDiscount = 0.1

function calculateBusCost(
  round: YesNo,
  bus: Bus,
  settlementId: number,
): number {
  if (round === 'N') {
    return 0
  }

  switch (bus) {
    case 'Y':
      return farAwaySettlements.includes(settlementId)
        ? FarFarAwayBusPrice
        : BusPrice
    case '1Way':
      return OneWayBusPrice
    default:
      return 0
  }
}

function getRoundDetails(roundName: string, lunchId: YesNo, bus: Bus): string {
  let details = roundName
  if (bus === 'Y') {
    details += ', כולל הסעה'
  } else if (bus === '1Way') {
    details += ', כולל הסעה כוון אחד'
  }
  if (lunchId === 'Y') {
    details += ', כולל צהרון'
  }
  return details
}

function calculatePayment(values: RegistrationFields): {
  amount: number
  items: string[]
} {
  const items: string[] = []
  let amount = 0
  if (values.firstRound === 'Y') {
    amount += RoundPrice
    amount += values.lunchId === 'Y' ? LunchPrice : 0
    items.push(getRoundDetails('מחזור ראשון', values.lunchId, values.busForth))
  }
  if (values.secondRound === 'Y') {
    amount += RoundPrice
    amount += values.secondRoundLunchId === 'Y' ? LunchPrice : 0
    items.push(
      getRoundDetails(
        'מחזור שני',
        values.secondRoundLunchId,
        values.secondRoundBus,
      ),
    )
  }
  if (values.thirdRound === 'Y') {
    amount += RoundPrice
    amount += values.thirdRoundLunchId === 'Y' ? LunchPrice : 0
    items.push(
      getRoundDetails(
        'מחזור שלישי',
        values.thirdRoundLunchId,
        values.thirdRoundBus,
      ),
    )
  }

  // la asaa no tiene discount
  switch (values.form) {
    case 'manui':
      amount -= amount * ManuiDiscount
      items.push(`הנחת מנוי ${ManuiDiscount * 100}%`)
      break
    case 'group':
      amount -= amount * GroupDiscount
      items.push(`הנחת קבוצה ${ManuiDiscount * 100}%`)
      break
    default:
      amount -= amount * NoDiscount
      break
  }

  amount += calculateBusCost(
    values.firstRound,
    values.busForth,
    values.settlementId,
  )
  amount += calculateBusCost(
    values.secondRound,
    values.secondRoundBus,
    values.settlementId,
  )
  amount += calculateBusCost(
    values.thirdRound,
    values.thirdRoundBus,
    values.settlementId,
  )

  return { amount: Math.floor(amount), items }
}
export { calculatePayment }
