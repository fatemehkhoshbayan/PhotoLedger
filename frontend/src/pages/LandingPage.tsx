import { useNavigate } from 'react-router-dom'

function Logo() {
  return (
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-600 shadow-lg shadow-amber-600/30">
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-11 text-white"
        aria-hidden="true"
      >
        <rect x="8" y="14" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="24" cy="26" r="7" stroke="currentColor" strokeWidth="2.5" />
        <path d="M18 14L22 8H26L30 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 32H36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-stone-50 via-amber-50/40 to-stone-100">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <Logo />

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          PhotoLedger
        </p>

        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Get paid faster, even from the field
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
          Matt runs a wedding photography business and is always on the move.
          PhotoLedger helps him create and send invoices in seconds — so he
          never waits days to get paid.
        </p>

        <button
          type="button"
          onClick={() => navigate('/chat')}
          className="mt-10 rounded-full bg-amber-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-600/30 transition hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-600/40"
        >
          Start Invoice
        </button>
      </main>

      <footer className="pb-8 text-center text-sm text-stone-500">
        Built for photographers who bill on the go
      </footer>
    </div>
  )
}
