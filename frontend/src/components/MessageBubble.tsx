import type { MessageSender } from '../types/chat'

type MessageBubbleProps = {
  sender: MessageSender
  text: string
}

export default function MessageBubble({ sender, text }: MessageBubbleProps) {
  const isBot = sender === 'bot'

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[70%] sm:text-base ${
          isBot
            ? 'rounded-bl-md bg-white text-stone-800 ring-1 ring-stone-200'
            : 'rounded-br-md bg-amber-600 text-white'
        }`}
      >
        {text}
      </div>
    </div>
  )
}
