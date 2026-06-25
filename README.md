# PhotoLedger

Help wedding photographers create and send invoices from the field — so they get paid faster.

## Frontend

The React app lives in `frontend/`.

```bash
cd frontend
npm install
npm run dev
```

### Routes

- `/` — Landing page with **Start Invoice** CTA
- `/chat` — AI chat interface for collecting invoice details

### Chatbot integration

The chat UI calls `frontend/src/services/chatService.ts`. Replace the mock `sendMessage` implementation with the real API when the backend team is ready.
