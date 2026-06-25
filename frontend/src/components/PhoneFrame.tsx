import type { ReactNode } from 'react'

type PhoneFrameProps = {
  children: ReactNode
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="fp-phone">
      <div className="fp-phone__screen">
        <div className="fp-phone__island" aria-hidden="true" />
        <div className="fp-phone__status">
          <span className="fp-phone__status-time">9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#1A1A12" aria-hidden="true">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5" width="3" height="7" rx="1" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
              <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.32" />
            </svg>
            <svg width="25" height="13" viewBox="0 0 25 13" aria-hidden="true">
              <rect
                x="0.5"
                y="0.5"
                width="20"
                height="12"
                rx="3.2"
                fill="none"
                stroke="#1A1A12"
                strokeOpacity="0.35"
              />
              <rect x="2" y="2" width="15" height="9" rx="1.5" fill="#1A1A12" />
              <rect x="22" y="4" width="2" height="5" rx="1" fill="#1A1A12" fillOpacity="0.35" />
            </svg>
          </div>
        </div>
        <div className="fp-phone__content">{children}</div>
        <div className="fp-phone__footer">
          <div className="fp-phone__home" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
