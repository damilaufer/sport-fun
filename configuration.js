function getPaymentUrl(form) {
  switch (form) {
    case 'manui':
      return 'https://private.invoice4u.co.il/newsite/he/clearing/public/i4u-clearing?ProductGuid=bce6561a-edc3-4f03-bc3b-a369a03b50ce'
    case 'group':
      return 'https://private.invoice4u.co.il/newsite/he/clearing/public/i4u-clearing?ProductGuid=5a0202d8-5d2d-4c56-b6f2-52daffa92f69' // 10%
    default:
      return 'https://private.invoice4u.co.il/newsite/he/clearing/public/i4u-clearing?ProductGuid=442b03ec-e69e-4c90-8e89-237b77cc0bf0' // 5% early birds
  }
}

const configuration = {
  currentGroup: 30, // 2024
  rounds: [
    {
      label: 'מחזור ראשון (11/7 - 1/7)',
      full: false,
    },
    {
      label: 'מחזור שני (25/7 - 14/7)',
      full: false,
    },
    {
      label: 'מחזור שלישי (8/8 - 28/7)',
      full: false,
    },
  ],
  getPaymentUrl: getPaymentUrl,
}

export { configuration }
