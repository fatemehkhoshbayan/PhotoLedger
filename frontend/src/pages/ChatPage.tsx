import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatThread from '../components/chat/ChatThread'
import FlashPayShell from '../components/FlashPayShell'
import { BackIcon, LogoIcon, SendRequestIcon } from '../components/FlashPayIcons'
import PhoneFrame from '../components/PhoneFrame'
import { CHAT_STEPS } from '../data/chatSteps'
import type { BookingStepValues } from '../data/chatSteps'
import { submitBookingRequest } from '../services/chatService'
import { EMPTY_BOOKING, type BookingData } from '../types/booking'
import { priceForDuration } from '../utils/bookingChat'

export default function ChatPage() {
  const [stepIndex, setStepIndex] = useState(0)
  const [selections, setSelections] = useState<Partial<BookingStepValues>>({})
  const [draft, setDraft] = useState('')
  const [calYear, setCalYear] = useState(2026)
  const [calMonth, setCalMonth] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const chatDone = stepIndex >= CHAT_STEPS.length

  const booking = useMemo<BookingData>(() => {
    const price = selections.duration
      ? priceForDuration(selections.duration)
      : EMPTY_BOOKING.price

    return {
      venue: selections.venue ?? '',
      date: selections.date ?? '',
      time: selections.time ?? '',
      duration: selections.duration ?? '',
      email: selections.email ?? '',
      phone: selections.phone ?? '',
      price,
    }
  }, [selections])

  function pick(key: keyof BookingStepValues, value: string) {
    setSelections((current) => {
      const next = { ...current, [key]: value }
      return next
    })
    setStepIndex((current) => current + 1)
    setDraft('')
  }

  function chooseDate(label: string) {
    pick('date', label)
  }

  function submitInput() {
    const step = CHAT_STEPS[stepIndex]
    if (!step || step.type !== 'input') return

    const value = draft.trim()
    if (!value) return

    if (step.inputType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return
    }

    pick(step.key, value)
  }

  function handleCalPrev() {
    setCalMonth((month) => {
      if (month === 0) {
        setCalYear((year) => year - 1)
        return 11
      }
      return month - 1
    })
  }

  function handleCalNext() {
    setCalMonth((month) => {
      if (month === 11) {
        setCalYear((year) => year + 1)
        return 0
      }
      return month + 1
    })
  }

  async function handleSubmitRequest() {
    setIsSubmitting(true)

    try {
      await submitBookingRequest(booking)
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FlashPayShell perspective="client">
      <PhoneFrame>
        <div className="fp-screen-panel">
          <header className="fp-chat-header">
            <Link to="/" className="fp-icon-btn" aria-label="Back">
              <BackIcon />
            </Link>
            <span className="fp-logo" style={{ width: 36, height: 36, borderRadius: 11 }}>
              <LogoIcon size={19} />
            </span>
            <div>
              <div className="fp-title">PhotoLedger</div>
              <div className="fp-label">Booking with Matt Reyes</div>
            </div>
          </header>

          <ChatThread
            stepIndex={stepIndex}
            selections={selections}
            draft={draft}
            calYear={calYear}
            calMonth={calMonth}
            booking={booking}
            onDraftChange={setDraft}
            onSubmitInput={submitInput}
            onPick={pick}
            onSelectDate={chooseDate}
            onCalPrev={handleCalPrev}
            onCalNext={handleCalNext}
          />

          <div className="fp-chat-footer">
            {isSubmitted ? (
              <div className="fp-chat-footer__done">
                Request sent — Matt will confirm your booking soon.
              </div>
            ) : chatDone ? (
              <button
                type="button"
                className="fp-btn fp-btn--primary fp-btn--block fp-btn--send-request"
                onClick={handleSubmitRequest}
                disabled={isSubmitting}
              >
                Send request to Matt
                <SendRequestIcon />
              </button>
            ) : (
              <div className="fp-chat-footer__waiting">Answer above to continue…</div>
            )}
          </div>
        </div>
      </PhoneFrame>
    </FlashPayShell>
  )
}
