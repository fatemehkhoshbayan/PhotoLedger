export type MessageSender = 'bot' | 'user'

export type Message = {
  id: string
  sender: MessageSender
  text: string
}
