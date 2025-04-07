import { configuration } from '../../configuration'
import { sendRegistrationMail } from '../../lib/mailer'

export default async function handler(req, res) {
  const values = req.body.values

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
    busForth: values.busForth === 'Y',
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
    secondRoundBus: values.secondRoundBus === 'Y',
    secondRoundBusComments: values.secondRoundBusComments,
    secondRoundLunchId: values.secondRoundLunchId === 'Y',
    thirdRound: values.thirdRound === 'Y',
    thirdRoundBus: values.thirdRoundBus === 'Y',
    thirdRoundBusComments: values.thirdRoundBusComments,
    thirdRoundLunchId: values.thirdRoundLunchId === 'Y',
  }

  try {
    // First register the kid with the existing backend
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
    if (kidResponse.status !== 200) {
      let message
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
      return res.status(500).json({ message })
    }
    
    const kidData = await kidResponse.json()
    values.amount = 10;
    values.ccPaid = true;
    // If payment is needed, process with Invoice4U
    if (values.amount > 0 && values.ccPaid) {
      try {
        // Prepare Invoice4U API request
        const invoice4uRequest = {
          request: {
            Invoice4UUserApiKey: configuration.invoice4u?.apiKey || 'YOUR_API_KEY_HERE',
            Type: '1', // Regular clearing
            CreditCardCompanyType: '1', // Default company type
            FullName: `${values.firstName} ${values.lastName}`,
            Phone: values.fatherCellPhone || values.motherCellPhone || values.phone,
            Email: values.email,
            Sum: values.amount.toString(),
            Description: `Sport Fun Registration - ${values.firstName} ${values.lastName}`,
            PaymentsNum: '1', // Single payment
            Currency: 'ILS',
            OrderIdClientUsage: kidData.id?.toString() || 'new-registration',
            IsDocCreate: 'true',
            DocHeadline: 'Sport Fun Registration',
            Comments: `Registration for ${values.firstName} ${values.lastName}`,
            IsManualDocCreationsWithParams: 'false',
            DocItemQuantity: '1',
            DocItemPrice: values.amount.toString(),
            DocItemTaxRate: '17',
            IsItemsBase64Encoded: 'false',
            DocItemName: 'Sport Fun Registration Fee',
            IsGeneralClient: 'false',
            IsAutoCreateCustomer: 'true',
            ReturnUrl: `${req.headers.origin}/registration-complete`, // Adjust to your success page
            AddToken: 'false',
            AddTokenAndCharge: 'false',
            ChargeWithToken: 'false',
            Refund: 'false',
            IsStandingOrderClearance: 'false',
            StandingOrderDuration: '0'
          }
        };
        
        // Call Invoice4U API
        const invoice4uResponse = await fetch(
          'https://apiqa.invoice4u.co.il/Services/ApiService.svc/ProcessApiRequestV2',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoice4uRequest),
          }
        );
        
        if (!invoice4uResponse.ok) {
          const errorData = await invoice4uResponse.json();
          console.error('Invoice4U API error:', errorData);
          return res.status(500).json({ 
            message: 'Payment processing error', 
            kidData, 
            paymentError: errorData 
          });
        }
        
        const invoice4uData = await invoice4uResponse.json();
        
        // Check for errors in the response
        if (invoice4uData.Errors && invoice4uData.Errors.length > 0) {
          console.error('Invoice4U returned errors:', invoice4uData.Errors);
          return res.status(500).json({ 
            message: 'Payment processing error', 
            kidData, 
            paymentError: invoice4uData.Errors 
          });
        }
        
        // Return success with payment redirect URL
        return res.status(200).json({
          ...kidData,
          paymentRedirectUrl: invoice4uData.ClearingRedirectUrl,
          paymentInfo: {
            paymentId: invoice4uData.OpenInfo?.find(i => i.Key === 'PaymentId')?.Value,
            clearingLogId: invoice4uData.OpenInfo?.find(i => i.Key === 'I4UClearingLogId')?.Value,
            clearingTraceId: invoice4uData.OpenInfo?.find(i => i.Key === 'ClearingTraceId')?.Value
          }
        });
      } catch (paymentError) {
        console.error('Payment processing error:', paymentError);
        // Return kid data even if payment processing failed
        return res.status(200).json({
          ...kidData,
          paymentError: {
            message: 'Failed to process payment, but registration was successful',
            error: paymentError.message
          }
        });
      }
    }
    
    // If no payment needed or not using credit card, just return kid data
    // await sendRegistrationMail(kid.email, kid.firstName, kid.lastName)
    return res.status(200).json(kidData);
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}
