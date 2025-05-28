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
}

const configuration: Configuration = {
  currentGroup: 30, // 2024
  rounds: [
    {
      label: 'מחזור ראשון (24/7 - 13/7)',
      full: false,
    },
    {
      label: 'מחזור שני (7/8 - 27/7)',
      full: true,
    },
    {
      label: 'מחזור שלישי (21/8 - 10/8)',
      full: false,
    },
  ],
  getPaymentUrl: getPaymentUrl,
}

export { configuration }
