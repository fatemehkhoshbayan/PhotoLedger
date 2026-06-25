import { useNavigate } from 'react-router-dom'
import FlashPayShell from '../components/FlashPayShell'
import PhoneFrame from '../components/PhoneFrame'
import { ChatIcon, LogoIcon } from '../components/FlashPayIcons'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <FlashPayShell perspective="client">
      <PhoneFrame>
        <div className="fp-screen-panel">
          <div className="fp-screen-scroll">
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 40 }}>
              <span className="fp-avatar fp-avatar--round fp-avatar--dark" style={{ width: 30, height: 30, fontSize: 11 }}>
                MR
              </span>
              <span className="fp-body" style={{ color: 'var(--fp-muted)' }}>
                Booking with{' '}
                <strong style={{ color: 'var(--fp-text)' }}>Matt Reyes Photography</strong>
              </span>
            </div>

            <span className="fp-logo" style={{ width: 60, height: 60, borderRadius: 18 }}>
              <LogoIcon size={32} />
            </span>

            <h1 className="fp-display" style={{ margin: '22px 0 0', color: 'var(--fp-text)' }}>
              Let&apos;s plan your
              <br />
              wedding shoot
            </h1>

            <p className="fp-body" style={{ color: 'var(--fp-muted)', margin: '12px 0 0', maxWidth: '32ch' }}>
              Chat with Matt&apos;s booking assistant and we&apos;ll send your details over for
              confirmation. Takes about two minutes — no forms.
            </p>

            <div className="fp-bubble fp-bubble--bot" style={{ marginTop: 26, maxWidth: '90%' }}>
              Hi! I&apos;m Flash Pay. Tell me about your big day and I&apos;ll send the details to
              Matt to confirm.
            </div>

            <div className="fp-eyebrow" style={{ margin: '22px 0 11px', letterSpacing: '0.1em' }}>
              What are you booking?
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
              <button type="button" className="fp-chip fp-chip--filled" onClick={() => navigate('/chat')}>
                Wedding
              </button>
              <button type="button" className="fp-chip" onClick={() => navigate('/chat')}>
                Engagement
              </button>
              <button type="button" className="fp-chip" onClick={() => navigate('/chat')}>
                Elopement
              </button>
            </div>
          </div>

          <div className="fp-screen-footer">
            <button
              type="button"
              className="fp-btn fp-btn--primary fp-btn--block"
              style={{ height: 56, borderRadius: 17, fontSize: 17 }}
              onClick={() => navigate('/chat')}
            >
              <ChatIcon />
              Start chatting
            </button>
          </div>
        </div>
      </PhoneFrame>
    </FlashPayShell>
  )
}
