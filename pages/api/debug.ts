import { NextApiRequest, NextApiResponse } from 'next'
import { sendRegistrationMail } from '../../lib/mailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, firstName, lastName } = req.query

  if (email) {
    const mailerResponse = await sendRegistrationMail(
      email as string,
      firstName as string,
      lastName as string,
    )
    res.status(200).json({ ok: Math.random() * 100, mailerResponse })
  } else {
    res.status(200).send('You need to add ?email=<value> to the URL')
  }
}
