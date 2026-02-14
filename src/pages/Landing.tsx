import '../styles/landing.css'

export type GameMode = 'default' | 'easy'

interface LandingProps {
  onStart: (mode: GameMode) => void
}

const TITLE_LETTERS = ['A', 'I', ' ', 'R', 'E', 'A', 'L']

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="landing-title" aria-label="AI Real">
          {TITLE_LETTERS.map((letter, i) => (
            <span
              key={i}
              className={`landing-letter ${letter === ' ' ? 'landing-letter--space' : ''}`}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
        <p className="landing-tagline">
          Look for 5 seconds — then the image blurs. Choose AI or Real from memory. Score at the end.
        </p>
        <div className="landing-actions">
          <button type="button" className="landing-cta" onClick={() => onStart('default')}>
            Play
          </button>
          <button type="button" className="landing-cta landing-cta--secondary" onClick={() => onStart('easy')}>
            Easy mode
          </button>
        </div>
        <p className="landing-easy-note">Easy: no timer, no blur — image stays visible.</p>
      </div>
    </div>
  )
}
