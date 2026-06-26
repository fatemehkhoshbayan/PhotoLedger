# PhotoLedger

Help wedding photographers create and send estimate invoices from the field — booked, locked, and paid automatically.

## Frontend

The React app lives in `frontend/`.

```bash
cd frontend
npm install
npm run dev
```

### Routes

- `/` — Welcome screen with booking chips and **Start chatting** CTA
- `/chat` — Guided conversational booking flow (venue, date, time, coverage, contact)

### Chatbot integration

The chat UI calls `frontend/src/services/chatService.ts`. Replace the mock `submitBookingRequest` implementation with the real API when the backend team is ready.
