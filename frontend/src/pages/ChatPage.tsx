import { useState } from 'react'
import { Link } from 'react-router-dom'
import ChatInput from '../components/ChatInput'
import MessageList from '../components/MessageList'
import { sendMessage } from '../services/chatService'
import type { Message } from '../types/chat'

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  sender: 'bot',
  text: "Hi! I'm here to help you create an invoice. What's the client's name?",
}

function createMessage(sender: Message['sender'], text: string): Message {
  return {
    id: crypto.randomUUID(),
    sender,
    text,
  }
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)

  async function handleSend(text: string) {
    const userMessage = createMessage('user', text)
    setMessages((current) => [...current, userMessage])
    setIsLoading(true)

    try {
      const reply = await sendMessage(text)
      setMessages((current) => [...current, createMessage('bot', reply)])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-100">
      <header className="border-b border-stone-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              PhotoLedger
            </p>
            <h1 className="text-lg font-semibold text-stone-900 sm:text-xl">
              Invoice Assistant
            </h1>
          </div>
          <Link
            to="/"
            className="text-sm font-medium text-stone-500 transition hover:text-stone-800"
          >
            Back
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
        <MessageList messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  )
}
