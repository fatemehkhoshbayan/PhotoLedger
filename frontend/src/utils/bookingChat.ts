const DURATION_PRICES: Record<string, number> = {
  '4 hours': 2400,
  '6 hours': 3200,
  '8 hours · full-day': 4200,
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export type CalendarCell = {
  day: string
  disabled: boolean
  fullLabel: string
}

export function priceForDuration(duration: string): number {
  return DURATION_PRICES[duration] ?? 4200
}

export function formatMoney(amount: number): string {
  return '$' + amount.toLocaleString('en-US')
}

export function buildTimeSlots(): string[] {
  const out: string[] = []

  for (let h = 8; h <= 21; h++) {
    for (const m of [0, 30]) {
      if (h === 21 && m === 30) break

      const ampm = h < 12 ? 'AM' : 'PM'
      let hh = h % 12
      if (hh === 0) hh = 12
      out.push(`${hh}:${m === 0 ? '00' : '30'} ${ampm}`)
    }
  }

  return out
}

export function buildCalendarCells(year: number, month: number): CalendarCell[] {
  const minBookable = new Date(2026, 5, 26)
  const startWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: CalendarCell[] = []

  for (let i = 0; i < startWeekday; i++) {
    cells.push({ day: '', disabled: true, fullLabel: '' })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const disabled = date < minBookable
    const fullLabel = `${WEEKDAYS[date.getDay()]} · ${MONTH_SHORT[month]} ${day}, ${year}`

    cells.push({
      day: String(day),
      disabled,
      fullLabel,
    })
  }

  return cells
}

export function calendarLabel(year: number, month: number): string {
  return `${MONTH_NAMES[month]} ${year}`
}

export function canGoCalPrev(year: number, month: number): boolean {
  return !(year < 2026 || (year === 2026 && month <= 5))
}

export function canGoCalNext(year: number, month: number): boolean {
  return !(year === 2027 && month >= 11)
}
