import { sendRegistrationMail } from '../../lib/mailer'

export default async function handler(req, res) {
  if (req.query.email) {
    sendRegistrationMail(
      req.query.email,
      req.query.firstName,
      req.query.lastName,
    )
    res.status(200).json({ ok: Math.random() * 100, message: 'Email sent' })
  } else {
    res.status(200).send('You need to add ?email=<value> to the URL')
  }
}
