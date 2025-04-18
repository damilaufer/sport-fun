import {
  kfarOranimSettlementId,
  lapidSettlementId,
  shilatSettlementId,
} from './constants'

/*
    majzor: 2250
    tzaharon: 900
    mejir asaa le majzor: 380
    kfar oranim/lapid/shilat: 500
    asaa kivun ejad: 220

    10% discount for manui le park hamaim
    5% discount for groups
     */
function calculatePayment(values) {
  const roundBusAmount = [
    kfarOranimSettlementId,
    lapidSettlementId,
    shilatSettlementId,
  ].includes(values.settlementId)
    ? 500
    : 380

  let amount = 0
  if (values.firstRound === 'Y') {
    amount += 2250
    amount += values.lunchId === 'Y' ? 900 : 0
    amount += values.busForth === 'Y' ? roundBusAmount : 0
  }
  if (values.secondRound === 'Y') {
    amount += 2250
    amount += values.secondRoundBus === 'Y' ? roundBusAmount : 0
    amount += values.secondRoundLunchId === 'Y' ? 900 : 0
  }
  if (values.thirdRound === 'Y') {
    amount += 2250
    amount += values.thirdRoundBus === 'Y' ? roundBusAmount : 0
    amount += values.thirdRoundLunchId === 'Y' ? 900 : 0
  }

  console.log('before', amount, values.form)

  switch (values.form) {
    case 'manui':
      amount -= amount * 0.1 // 10%
      break
    case 'group':
      amount -= amount * 0.05 // 10% // 5%
      break
    default:
      break
  }

  console.log('after discount', amount, values.form)

  return amount
}
export { calculatePayment }
