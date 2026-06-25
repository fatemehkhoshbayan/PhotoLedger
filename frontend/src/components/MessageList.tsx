import { useEffect, useRef } from 'react'
import type { Message } from '../types/chat'
import MessageBubble from './MessageBubble'

type MessageListProps = {
  messages: Message[]
  isLoading?: boolean
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          sender={message.sender}
          text={message.text}
        />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-stone-500 ring-1 ring-stone-200">
            Typing...
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
