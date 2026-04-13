import { RegistrationFields } from '../types/RegistrationFields'
import { Bus, YesNo } from '../types/Round'
import { farAwaySettlements } from './constants'
import { configuration } from '../configuration'

const prices = configuration.prices

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
        ? prices.farFarAwayBusPrice
        : prices.busPrice
    case '1Way':
      return prices.oneWayBusPrice
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
    amount += prices.roundPrice
    amount += values.lunchId === 'Y' ? prices.lunchPrice : 0
    items.push(getRoundDetails('מחזור ראשון', values.lunchId, values.busForth))
  }
  if (values.secondRound === 'Y') {
    amount += prices.roundPrice
    amount += values.secondRoundLunchId === 'Y' ? prices.lunchPrice : 0
    items.push(
      getRoundDetails(
        'מחזור שני',
        values.secondRoundLunchId,
        values.secondRoundBus,
      ),
    )
  }
  if (values.thirdRound === 'Y') {
    amount += prices.roundPrice
    amount += values.thirdRoundLunchId === 'Y' ? prices.lunchPrice : 0
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
      amount -= amount * prices.manuiDiscount
      items.push(`הנחת מנוי ${prices.manuiDiscount * 100}%`)
      break
    case 'group':
      amount -= amount * prices.groupDiscount
      items.push(`הנחת קבוצה ${prices.groupDiscount * 100}%`)
      break
    default:
      amount -= amount * prices.noDiscount
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
