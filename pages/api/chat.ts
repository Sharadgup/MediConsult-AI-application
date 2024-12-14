import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { message } = req.body

  if (!message) {
    return res.status(400).json({ message: 'Message is required' })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful medical assistant providing information about medicines and health conditions." },
        { role: "user", content: message }
      ],
    })

    const aiMessage = completion.choices[0].message.content

    res.status(200).json({ message: aiMessage })
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ message: 'An error occurred while processing your request' })
  }
}

