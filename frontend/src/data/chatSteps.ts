export type BookingStepValues = {
  venue: string
  date: string
  time: string
  duration: string
  email: string
  phone: string
}

export type ChatStepType = 'input' | 'calendar' | 'timeslots' | 'chips'

export type ChatStep = {
  key: keyof BookingStepValues
  type: ChatStepType
  q: string
  placeholder?: string
  inputType?: 'text' | 'email' | 'tel'
  opts?: string[]
}

export const CHAT_STEPS: ChatStep[] = [
  {
    key: 'venue',
    type: 'input',
    q: "Hi, I'm Flash Pay! I'll help you book Matt Reyes for your big day. First — where's the celebration?",
    placeholder: 'e.g. The Old Mill, Sonoma',
    inputType: 'text',
  },
  {
    key: 'date',
    type: 'calendar',
    q: 'Love it. Tap your wedding date on the calendar.',
  },
  {
    key: 'time',
    type: 'timeslots',
    q: 'Got it. What time should Matt arrive?',
  },
  {
    key: 'duration',
    type: 'chips',
    q: 'How much coverage do you need?',
    opts: ['4 hours', '6 hours', '8 hours · full-day'],
  },
  {
    key: 'email',
    type: 'input',
    q: 'Almost there — what email should Matt send the invoice to?',
    placeholder: 'you@email.com',
    inputType: 'email',
  },
  {
    key: 'phone',
    type: 'input',
    q: 'And a mobile number for payment reminders?',
    placeholder: '(415) 555-0123',
    inputType: 'tel',
  },
]
