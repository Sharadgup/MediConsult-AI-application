import type { NextApiRequest, NextApiResponse } from 'next'
import { findUser } from '@/utils/userUtils'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  const user = findUser(username)

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.status(200).json({ message: 'Login successful' })
}

