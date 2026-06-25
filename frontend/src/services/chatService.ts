import type { BookingData } from '../types/booking'

// Replace these function bodies when the real chatbot API is ready.
export async function submitBookingRequest(booking: BookingData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  console.info('Booking request ready for Matt:', booking)
}
