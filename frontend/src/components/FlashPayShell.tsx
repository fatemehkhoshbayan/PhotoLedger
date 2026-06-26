import { type ReactNode, useState } from 'react'
import { LogoIcon } from './FlashPayIcons'

type Perspective = 'client' | 'photographer'

type FlashPayShellProps = {
  children: ReactNode
  perspective?: Perspective
  onPerspectiveChange?: (value: Perspective) => void
}

export default function FlashPayShell({
  children,
  perspective: controlledPerspective,
  onPerspectiveChange,
}: FlashPayShellProps) {
  const [internalPerspective, setInternalPerspective] =
    useState<Perspective>('photographer')
  const perspective = controlledPerspective ?? internalPerspective

  function setPerspective(value: Perspective) {
    setInternalPerspective(value)
    onPerspectiveChange?.(value)
  }

  return (
    <div className="fp fp-stage fp-shell">
      <header className="fp-shell__header">
        <div className="fp-shell__brand">
          <span className="fp-logo">
            <LogoIcon />
          </span>
          <span className="fp-wordmark">PhotoLedger</span>
          <span className="fp-tagline">Booked. Locked. Paid — automatically.</span>
        </div>
        <div className="fp-toggle" role="tablist" aria-label="Perspective">
          <button
            type="button"
            className="fp-toggle__btn"
            role="tab"
            aria-selected={perspective === 'client'}
            onClick={() => setPerspective('client')}
          >
            Client
          </button>
          <button
            type="button"
            className="fp-toggle__btn"
            role="tab"
            aria-selected={perspective === 'photographer'}
            onClick={() => setPerspective('photographer')}
          >
            Photographer
          </button>
        </div>
      </header>

      <div className="fp-shell__phone-area">{children}</div>
    </div>
  )
}
