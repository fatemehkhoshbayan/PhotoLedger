import { type FormEvent, useEffect, useRef } from 'react'
import { CHAT_STEPS, type ChatStep } from '../../data/chatSteps'
import type { BookingStepValues } from '../../data/chatSteps'
import { buildTimeSlots } from '../../utils/bookingChat'
import BookingSummary from './BookingSummary'
import ChatCalendar from './ChatCalendar'
import type { BookingData } from '../../types/booking'

type ChatThreadProps = {
  stepIndex: number
  selections: Partial<BookingStepValues>
  draft: string
  calYear: number
  calMonth: number
  booking: BookingData
  onDraftChange: (value: string) => void
  onSubmitInput: () => void
  onPick: (key: keyof BookingStepValues, value: string) => void
  onSelectDate: (label: string) => void
  onCalPrev: () => void
  onCalNext: () => void
}

function StepInput({
  step,
  draft,
  onDraftChange,
  onSubmitInput,
}: {
  step: ChatStep
  draft: string
  onDraftChange: (value: string) => void
  onSubmitInput: () => void
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmitInput()
  }

  return (
    <form className="fp-chat-input-row" onSubmit={handleSubmit}>
      <input
        type={step.inputType ?? 'text'}
        className="fp-input"
        value={draft}
        onChange={(event) => onDraftChange(event.target.value)}
        placeholder={step.placeholder}
      />
      <button type="submit" className="fp-btn fp-btn--primary fp-btn--compact">
        Continue
      </button>
    </form>
  )
}

export default function ChatThread({
  stepIndex,
  selections,
  draft,
  calYear,
  calMonth,
  booking,
  onDraftChange,
  onSubmitInput,
  onPick,
  onSelectDate,
  onCalPrev,
  onCalNext,
}: ChatThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const chatDone = stepIndex >= CHAT_STEPS.length
  const timeSlots = buildTimeSlots()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [stepIndex, selections, chatDone])

  function renderCurrentStepWidgets(step: ChatStep) {
    if (step.type === 'chips' && step.opts) {
      return (
        <div className="fp-chat-chips">
          {step.opts.map((option) => (
            <button
              key={option}
              type="button"
              className="fp-chip"
              onClick={() => onPick(step.key, option)}
            >
              {option}
            </button>
          ))}
        </div>
      )
    }

    if (step.type === 'calendar') {
      return (
        <ChatCalendar
          year={calYear}
          month={calMonth}
          onPrev={onCalPrev}
          onNext={onCalNext}
          onSelectDate={onSelectDate}
        />
      )
    }

    if (step.type === 'timeslots') {
      return (
        <div className="fp-card fp-chat-widget">
          <div className="fp-eyebrow" style={{ margin: '2px 2px 9px' }}>
            Available times · tap one
          </div>
          <div className="fp-slots">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className="fp-slot"
                onClick={() => onPick('time', slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (step.type === 'input') {
      return (
        <StepInput
          step={step}
          draft={draft}
          onDraftChange={onDraftChange}
          onSubmitInput={onSubmitInput}
        />
      )
    }

    return null
  }

  return (
    <div className="fp-chat-messages">
      {CHAT_STEPS.map((step, index) => {
        if (index > stepIndex) return null

        const answer = selections[step.key]
        const isCurrent = index === stepIndex && !chatDone

        return (
          <div key={step.key} className="fp-chat-turn">
            <div className="fp-bubble fp-bubble--bot">{step.q}</div>

            {answer ? (
              <div className="fp-bubble fp-bubble--user">{answer}</div>
            ) : null}

            {isCurrent ? renderCurrentStepWidgets(step) : null}
          </div>
        )
      })}

      {chatDone ? <BookingSummary booking={booking} /> : null}

      <div ref={bottomRef} />
    </div>
  )
}
