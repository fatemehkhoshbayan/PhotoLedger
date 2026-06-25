import type { BookingData } from '../../types/booking'
import { formatMoney } from '../../utils/bookingChat'

type BookingSummaryProps = {
  booking: BookingData
}

export default function BookingSummary({ booking }: BookingSummaryProps) {
  const deposit = Math.round(booking.price * 0.3)

  return (
    <>
      <div className="fp-bubble fp-bubble--bot">
        Perfect — here&apos;s your request. I&apos;ll send it to Matt to confirm:
      </div>

      <div className="fp-card fp-card--raised fp-booking-summary">
        <div className="fp-eyebrow">Booking request</div>

        <div className="fp-booking-summary__rows">
          <div className="fp-booking-summary__row">
            <span>Venue</span>
            <strong>{booking.venue}</strong>
          </div>
          <div className="fp-booking-summary__row">
            <span>Date</span>
            <strong>{booking.date}</strong>
          </div>
          <div className="fp-booking-summary__row">
            <span>Arrival</span>
            <strong>{booking.time}</strong>
          </div>
          <div className="fp-booking-summary__row">
            <span>Coverage</span>
            <strong>{booking.duration}</strong>
          </div>
          <div className="fp-booking-summary__row">
            <span>Email</span>
            <strong>{booking.email}</strong>
          </div>
          <div className="fp-booking-summary__row">
            <span>Mobile</span>
            <strong>{booking.phone}</strong>
          </div>
        </div>

        <div className="fp-booking-summary__divider" />

        <div className="fp-booking-summary__total">
          <span>Estimated total</span>
          <span>{formatMoney(booking.price)}</span>
        </div>

        <div className="fp-card--info" style={{ marginTop: 11 }}>
          No charge yet. Once Matt confirms, your 30% deposit invoice (
          {formatMoney(deposit)}) is emailed to you automatically.
        </div>
      </div>
    </>
  )
}
