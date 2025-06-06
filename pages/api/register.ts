import { NextApiRequest, NextApiResponse } from 'next'
import { configuration } from '../../configuration'
import { RegistrationFields } from '../../types/RegistrationFields'

async function saveRegistration(
  kid: any,
  round: any,
): Promise<{ error: string; kidId?: number }> {
  const kidResponse = await fetch(
    'https://summer-camp-manager.herokuapp.com/api/kids',
    // 'http://localhost:5000/api/kids',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kid, round }),
    },
  )

  const contentType = kidResponse.headers.get('Content-Type')
  let message = ''
  let kidId: undefined
  if (kidResponse.status === 200) {
    const json = await kidResponse.json()
    kidId = json.kid.id
  } else {
    if (contentType.startsWith('text/html')) {
      const text = await kidResponse.text()
      console.log(text)
      message = /<pre>(.*?)<br>/gm.exec(text)?.[1] || 'Unknown error'
    } else {
      const json = await kidResponse.json()
      message = json.statusCode
        ? ` ${json.statusCode}-${json.statusText}`
        : json.statusText
    }
  }
  return { error: message, kidId }
}

const formBusToApiBus = {
  Y: 1,
  N: 0,
  '1Way': 2,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const values = req.body.values as RegistrationFields

  const kid = {
    id: -1, // Some negative number for a new kid
    address: values.address,
    busStop: values.busStop,
    classId: Number(values.classId),
    comments: values.comments,
    email: values.email,
    emergencyPhone: values.emergencyPhone,
    fatherCellPhone: values.fatherCellPhone,
    firstName: values.firstName,
    friends: values.friends,
    lastName: values.lastName,
    medicalComments: values.medicalComments,
    medicalCommentsYesNo: values.medicalCommentsYesNo,
    motherCellPhone: values.motherCellPhone,
    neighbourhoodId: Number(values.neighbourhoodId || 0),
    otherSchool: values.otherSchool,
    parkHaMaimSubscriber: values.parkHaMaimSubscriber === 'Y',
    phone: values.phone,
    schoolId: Number(values.schoolId),
    settlementId: Number(values.settlementId),
    sex: values.sex,
    sportId: Number(values.sportId),
    swims: values.swims === 'Y',
    swimsComments: values.swimsComments,
    vegetarian: values.vegetarian === 'Y',
    vegetarianComments: values.vegetarianComments,
  }

  const round = {
    groupId: configuration.currentGroup,
    amount: values.amount,
    busForth: formBusToApiBus[values.busForth],
    busForthComments: values.busForthComments,
    busPaid: values.busPaid,
    cashPaid: values.cashPaid,
    ccExpiration: values.ccExpiration,
    ccNumber: values.ccNumber,
    ccOwnerID: values.ccOwnerID,
    ccOwnerName: values.ccOwnerName,
    ccPaid: values.ccPaid,
    chequePaid: values.chequePaid,
    firstRound: values.firstRound === 'Y',
    lunchId: values.lunchId === 'Y',
    receiptNumber: values.receiptNumber,
    secondRound: values.secondRound === 'Y',
    secondRoundBus: formBusToApiBus[values.secondRoundBus],
    secondRoundBusComments: values.secondRoundBusComments,
    secondRoundLunchId: values.secondRoundLunchId === 'Y',
    thirdRound: values.thirdRound === 'Y',
    thirdRoundBus: formBusToApiBus[values.thirdRoundBus],
    thirdRoundBusComments: values.thirdRoundBusComments,
    thirdRoundLunchId: values.thirdRoundLunchId === 'Y',
  }

  try {
    // First register the kid with the existing backend
    const registrationResponse = await saveRegistration(kid, round)
    if (registrationResponse.error) {
      console.error('Registration error:', registrationResponse.error)
      return res.status(500).json({ message: registrationResponse.error })
    } else {
      // Save the kid.id to we can update with the invoice4u id
      kid.id = registrationResponse.kidId
    }

    // Create a mock kidData object with the properties expected by the client
    const kidData = {
      id: Date.now(), // Use timestamp as a temporary ID
      kid: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        // Add other properties as needed
      },
      rounds: [
        {
          groupId: configuration.currentGroup,
          // Add other round properties as needed
        },
      ],
    }

    // If payment is needed, process with Invoice4U
    if (values.amount > 0 && values.ccPaid) {
      try {
        // Prepare Invoice4U API request
        const invoice4uRequest = {
          request: {
            Invoice4UUserApiKey: process.env.Invoice4U_Key,
            Type: 1, // Regular clearing
            CreditCardCompanyType: 1, // Default company type
            FullName: `${values.firstName} ${values.lastName}`,
            Phone:
              values.fatherCellPhone || values.motherCellPhone || values.phone,
            Email: values.email,
            Sum: values.amount,
            Description: `הרשמה לספורט Fun עבור - ${values.firstName} ${values.lastName}`,
            PaymentsNum: values.payments,
            Currency: 'ILS',
            OrderIdClientUsage: kidData.id?.toString() || 'new-registration',
            IsDocCreate: true,
            DocHeadline: 'הרשמה לספורט Fun',
            Comments: `Registration for ${values.firstName} ${values.lastName}`,
            IsManualDocCreationsWithParams: false,
            DocItemQuantity: Array(values.amountDetails.length)
              .fill('1')
              .join('|'),
            DocItemPrice: Array(values.amountDetails.length)
              .fill('0')
              .join('|'),
            TaxIncluded: true,
            // DocItemTaxRate: '17',
            IsItemsBase64Encoded: false,
            DocItemName: values.amountDetails.join('|'),
            IsGeneralClient: true,
            IsAutoCreateCustomer: true,
            ReturnUrl: `${req.headers.origin}/registration-complete`, // Adjust to your success page
            AddToken: false,
            AddTokenAndCharge: false,
            ChargeWithToken: false,
            Refund: false,
            IsStandingOrderClearance: false,
            StandingOrderDuration: 0,
          },
        }

        console.log(
          'Calling invoice4u with request:',
          JSON.stringify(invoice4uRequest),
        )

        // Call Invoice4U API
        const invoice4uResponse = await fetch(process.env.Invoice4U_Url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(invoice4uRequest),
        })

        if (!invoice4uResponse.ok) {
          const errorData = await invoice4uResponse.json()
          console.error('Invoice4U API error:', errorData)
          return res.status(500).json({
            message: 'Payment processing error',
            kidData,
            paymentError: errorData,
          })
        }

        const invoice4uData = await invoice4uResponse.json()

        // Check for errors in the response
        if (invoice4uData.Errors && invoice4uData.Errors.length > 0) {
          console.error('Invoice4U returned errors:', invoice4uData.Errors)
          return res.status(500).json({
            message: 'Payment processing error',
            kidData,
            paymentError: invoice4uData.Errors,
          })
        }

        console.log('Invoice4U response:', JSON.stringify(invoice4uData))

        // Success, so update the round in the database
        const clearingLogId = invoice4uData.d.OpenInfo?.find(
          (i) => i.Key === 'I4UClearingLogId',
        )?.Value

        if (clearingLogId) {
          round.receiptNumber = clearingLogId
          const registrationResponse = await saveRegistration(kid, round)
          if (registrationResponse.error) {
            console.error('Update kid error:', registrationResponse.error)
          }
        }

        // Return success with payment redirect URL and instruct client to open popup
        return res.status(200).json({
          ...kidData,
          kid: kidData.kid, // Ensure kid property is included
          rounds: kidData.rounds, // Ensure rounds property is included
          paymentRedirectUrl: invoice4uData.d.ClearingRedirectUrl,
          openInPopup: true, // Flag for client to know it should open in popup
          paymentInfo: {
            paymentId: invoice4uData.d.OpenInfo?.find(
              (i) => i.Key === 'PaymentId',
            )?.Value,
            clearingLogId,
            clearingTraceId: invoice4uData.d.OpenInfo?.find(
              (i) => i.Key === 'ClearingTraceId',
            )?.Value,
          },
        })
      } catch (paymentError) {
        console.error('Payment processing error:', paymentError)
        // Return kid data even if payment processing failed
        return res.status(200).json({
          ...kidData,
          kid: kidData.kid, // Ensure kid property is included
          rounds: kidData.rounds, // Ensure rounds property is included
          paymentError: {
            message:
              'Failed to process payment, but registration was successful',
            error: paymentError.message,
          },
        })
      }
    }

    // If no payment needed or not using credit card, just return kid data
    // await sendRegistrationMail(kid.email, kid.firstName, kid.lastName)
    return res.status(200).json({
      ...kidData,
      kid: kidData.kid, // Ensure kid property is included
      rounds: kidData.rounds, // Ensure rounds property is included
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res
      .status(500)
      .json({ message: 'Registration failed', error: error.message })
  }
}
