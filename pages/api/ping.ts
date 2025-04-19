import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name } = req.query

  if (typeof name === 'string') {
    res.status(200).json({ message: `hello ${name}` })
  } else {
    res
      .status(400)
      .json({ error: 'Name must be provided in the URL as a string' })
  }
}
