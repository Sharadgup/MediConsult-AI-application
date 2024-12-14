import { Metadata } from 'next'
import App from "./components/App.2"

export const metadata: Metadata = {
  title: 'MediConsult AI - Medicine Consulting and Solutions',
  description: 'AI-powered platform for prescription management and alternative medicine suggestions',
}

export default function Home() {
  return (
    <App />
  )
}

// Add this to ensure the OpenAI API key is available
export const config = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
}

