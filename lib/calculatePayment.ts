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

function calculatePayment(values: RegistrationFields) {
  let amount = 0
  if (values.firstRound === 'Y') {
    amount += RoundPrice
    amount += values.lunchId === 'Y' ? LunchPrice : 0
  }
  if (values.secondRound === 'Y') {
    amount += RoundPrice
    amount += values.secondRoundLunchId === 'Y' ? LunchPrice : 0
  }
  if (values.thirdRound === 'Y') {
    amount += RoundPrice
    amount += values.thirdRoundLunchId === 'Y' ? LunchPrice : 0
  }

  // la asaa no tiene discount
  switch (values.form) {
    case 'manui':
      amount -= amount * ManuiDiscount
      break
    case 'group':
      amount -= amount * GroupDiscount
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

  return Math.floor(amount)
}
export { calculatePayment }
