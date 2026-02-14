import '../styles/landing.css'

interface LandingProps {
  onStart: () => void
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
          Is it AI or real? Guess for each image.
        </p>
        <button type="button" className="landing-cta" onClick={onStart}>
          Play
        </button>
      </div>
    </div>
  )
}
