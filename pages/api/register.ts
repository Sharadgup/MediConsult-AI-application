import type { NextApiRequest, NextApiResponse } from 'next'
import { findUser, saveUser } from '@/utils/userUtils'
import { v4 as uuidv4 } from 'uuid'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body

  if (findUser(username)) {
    return res.status(400).json({ message: 'Username already exists' })
  }

  const newUser = {
    id: uuidv4(),
    username,
    password,
  }

  saveUser(newUser)

  res.status(201).json({ message: 'User registered successfully' })
}

