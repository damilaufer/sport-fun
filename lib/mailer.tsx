import nodemailer from 'nodemailer'

function sendRegistrationMail(to: string, firstName: string, lastName: string) {
  const transporter = nodemailer.createTransport({
    host: '@@@smtppro.zoho.com',
    // some
    port: 587000,
    secure: false,
    auth: {
      user: 'basura4390@gmail.com',
      pass: process.env.mailer_pwd,
    },
  })

  try {
    var message = {
      from: 'sportfun@walla.co.il',
      to,
      subject: 'הרשמה לספורטפאן',
      text: 'Plaintext version of the message',
      html: `<body dir="rtl">
              <img src="https://sfilev2.f-static.com/image/users/645683/ftp/my_files/sop-resize-400-sportfun%20logo-2.jpg?sopC=1493653147873" alt="sport-fun" />
              <p>תודה על הרשמתכם לקייטנת ספורטפאן קיץ 2023</p>

              <p>עבור <b>${firstName} ${lastName}<b></p>

              <div>אנא הקפידו להשלים את הרישום והתשלום בעמוד התשלום המאובטח.</div>
              <div>שימו לב להוסיף לסל התשלום את כל הנתונים שבחרתם לילדכם לקייטנה.</div>
              
              <p>מאחלים לכם קיץ שקט, מהנה ובטוח.</p>
              
              <div>לכל לשאלה, בקשה או הערה, הנכם מוזמנים לפנות ל :</div>
              <div>
                <a href="www.sportfun.co.il">www.sportfun.co.il</a>
              </div>
              <div>
                <a href="mailto:alexraijman@gmail.com">alexraijman@gmail.com</a>
              </div>
              <div>
                <a href="tel:0523670576">0523670576</a>
              </div>
              
              <p>אלכס רייכמן</p>
              
              <div>מנהל קייטנת ספורטפאן</div>
            </body>'`,
    }
    transporter.sendMail(message, (err: any, info: any) => {
      if (err) {
        console.log('Error sending email', err)
      } else {
        console.log('email sent')
        console.log(info)
      }
    })
  } catch (error) {
    console.log('ERROR')
    console.log(error)
  }
}

export { sendRegistrationMail }
