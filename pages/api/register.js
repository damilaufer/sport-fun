export default async function handler(req, res) {
  const values = req.body.values

  const kid = {
    id: '-1', // Some negative number for a new kid
    vegetarian: values.vegetarian,
    vegetarianComments: values.vegetarianComments,
    parkHaMaimSubscriber: values.parkHaMaimSubscriber,
    email: values.email,
    swims: values.swims,
    swimsComments: values.swimsComments,
    motherCellPhone: values.motherCellPhone,
    firstName: values.firstName,
    lastName: values.lastName,
    sex: values.sex,
    phone: values.phone,
    fatherCellPhone: values.fatherCellPhone,
    emergencyPhone: values.emergencyPhone,
    schoolId: values.schoolId,
    otherSchool: values.otherSchool,
    classId: values.classId,
    sportId: values.sportId,
    friends: values.friends,
    address: values.address,
    busStop: values.busStop,
    settlementId: values.settlementId,
    neighbourhoodId: values.neighbourhoodId,
    comments: values.comments,
    medicalComments: values.medicalComments,
    medicalCommentsYesNo: values.medicalCommentsYesNo,
  }

  const round = {
    groupId: 29, // 2021
    busForth: values.busForth,
    busForthComments: values.busForthComments,
    busPaid: values.busPaid,
    lunchId: values.lunchId,
    amount: values.amount,
    cashPaid: values.cashPaid,
    chequePaid: values.chequePaid,
    ccPaid: values.ccPaid,
    ccNumber: values.ccNumber,
    ccExpiration: values.ccExpiration,
    ccOwnerID: values.ccOwnerID,
    ccOwnerName: values.ccOwnerName,
    receiptNumber: values.receiptNumber,
    secondRound: values.secondRound,
    secondRoundLunchId: values.secondRoundLunchId,
    secondRoundBus: values.secondRoundBus,
    secondRoundBusComments: values.secondRoundBusComments,
    thirdRound: values.thirdRound,
    thirdRoundLunchId: values.thirdRoundLunchId,
    thirdRoundBus: values.thirdRoundBus,
    thirdRoundBusComments: values.thirdRoundBusComments,
    firstRound: values.firstRound,
  }
  try {
    const response = await fetch(
      'https://summer-camp-manager.herokuapp.com/api/kids',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kid, round }),
      },
    )
    const contentType = response.headers.get('Content-Type')
    if (response.status !== 200) {
      let message
      if (contentType.startsWith('text/html')) {
        const text = await response.text()
        console.log(text)
        message = /<pre>(.*?)<br>/gm.exec(text)?.[1] || 'Unkown error'
      } else {
        const json = await response.json()
        message = json.statusCode
          ? ` ${json.statusCode}-${json.statusText}`
          : json.statusText
      }
      res.status(500).json({ message })
    } else {
      const json = await response.json() // parses JSON response into native JavaScript objects
      res.status(200).json(json)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ text: 'Some error!!!' })
  }
}
