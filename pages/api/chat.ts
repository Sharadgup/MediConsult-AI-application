import { OpenAI } from 'openai';  // Import OpenAI directly
import type { NextApiRequest, NextApiResponse } from 'next';

// Initialize OpenAI API client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure the environment variable is set correctly
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  // Validate if the message is provided
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  // Sanitize the message to avoid unexpected content
  const sanitizedMessage = message.trim();
  if (sanitizedMessage.length === 0) {
    return res.status(400).json({ message: 'Message content is empty' });
  }

  // Check if the OpenAI API key is missing
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ message: 'API key is missing in environment variables' });
  }

  try {
    // Create chat completion request
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // You can replace with gpt-3.5 if needed
      messages: [
        {
          role: 'system',
          content: 'You are a helpful medical assistant providing information about medicines and health conditions.',
        },
        { role: 'user', content: sanitizedMessage },
      ],
    });

    // Log OpenAI response for debugging
    console.log('OpenAI response:', completion);

    // Check if AI response is available
    const aiMessage = completion.choices?.[0]?.message?.content;

    if (!aiMessage) {
      return res.status(500).json({ message: 'No response from OpenAI' });
    }

    // Respond with the message from OpenAI
    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error('OpenAI API error:', error); // Logs the error details
    res.status(500).json({
      message: 'An error occurred while processing your request',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null, // Optional: Add stack trace for better debugging
    });
  }
}
