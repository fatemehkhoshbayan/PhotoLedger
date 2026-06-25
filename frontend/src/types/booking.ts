export type BookingData = {
  venue: string
  date: string
  time: string
  duration: string
  email: string
  phone: string
  price: number
}

export const EMPTY_BOOKING: BookingData = {
  venue: '',
  date: '',
  time: '',
  duration: '',
  email: '',
  phone: '',
  price: 4200,
}
