function getPaymentUrl(form) {
  switch (form) {
    case 'manui':
      return 'https://private.invoice4u.co.il/newsite/he/clearing/public/i4u-clearing?ProductGuid=bce6561a-edc3-4f03-bc3b-a369a03b50ce'
    case 'group':
      return 'https://private.invoice4u.co.il/newsite/he/clearing/public/i4u-clearing?ProductGuid=442b03ec-e69e-4c90-8e89-237b77cc0bf0' // 5%
    default:
      return 'https://private.invoice4u.co.il/newsite/he/clearing/public/i4u-clearing?ProductGuid=eae795f9-4e8c-4878-b9d4-aec05177e28a' // 0%
  }
}

type Configuration = {
  currentGroup: number
  rounds: Array<{
    label: string
    full: boolean
  }>
  getPaymentUrl: (form: string) => string
  prices: {
    roundPrice: number
    lunchPrice: number
    busPrice: number
    farFarAwayBusPrice: number
    oneWayBusPrice: number
    noDiscount: number
    groupDiscount: number
    manuiDiscount: number
  }
}

const configuration: Configuration = {
  currentGroup: 30, // 2024
  rounds: [
    {
      label: 'מחזור ראשון (16/7 - 5/7)',
      full: false,
    },
    {
      label: 'מחזור שני (30/7 - 19/7)',
      full: false,
    },
    {
      label: 'מחזור שלישי (13/8 - 2/8)',
      full: false,
    },
  ],
  getPaymentUrl: getPaymentUrl,
  prices: {
    roundPrice: 2250,
    lunchPrice: 900,
    busPrice: 380,
    farFarAwayBusPrice: 500,
    oneWayBusPrice: 220,
    noDiscount: 0.05,
    groupDiscount: 0.1,
    manuiDiscount: 0.1,
  },
}

export { configuration }
