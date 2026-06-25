import { ChevronLeftIcon, ChevronRightIcon } from '../FlashPayIcons'
import {
  buildCalendarCells,
  calendarLabel,
  canGoCalNext,
  canGoCalPrev,
} from '../../utils/bookingChat'

type ChatCalendarProps = {
  year: number
  month: number
  onPrev: () => void
  onNext: () => void
  onSelectDate: (label: string) => void
}

const DAYS_OF_WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function ChatCalendar({
  year,
  month,
  onPrev,
  onNext,
  onSelectDate,
}: ChatCalendarProps) {
  const cells = buildCalendarCells(year, month)

  return (
    <div className="fp-cal fp-chat-widget">
      <div className="fp-cal__head">
        <button
          type="button"
          className="fp-cal__nav"
          onClick={onPrev}
          disabled={!canGoCalPrev(year, month)}
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </button>
        <span className="fp-cal__month">{calendarLabel(year, month)}</span>
        <button
          type="button"
          className="fp-cal__nav"
          onClick={onNext}
          disabled={!canGoCalNext(year, month)}
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className="fp-cal__grid" style={{ marginBottom: 5 }}>
        {DAYS_OF_WEEK.map((day) => (
          <span key={day} className="fp-cal__dow">
            {day}
          </span>
        ))}
      </div>

      <div className="fp-cal__grid">
        {cells.map((cell, index) => (
          <div key={`${cell.day}-${index}`} className="fp-cal__cell">
            {cell.day ? (
              <button
                type="button"
                className={`fp-cal__day${cell.disabled ? ' fp-cal__day--muted' : ''}`}
                disabled={cell.disabled}
                onClick={() => onSelectDate(cell.fullLabel)}
              >
                {cell.day}
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
