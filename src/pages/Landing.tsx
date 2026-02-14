import '../styles/landing.css'

interface LandingProps {
  onStart: () => void,
  onStartTutorial?: () => void,
}

export default function Landing({ onStart, onStartTutorial }: LandingProps) {
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="landing-title">AI or Real?</h1>
        <p className="landing-tagline">
          Can you tell the difference? Guess whether each image is AI-generated or real.
        </p>
        <button
          type="button"
          className="landing-cta"
          onClick={onStart}
        >
          Start game
        </button>
      </div>
      <div className="landing-info">
        <button
          type="button"
          className="tutorial-btn"
          onClick={onStartTutorial}
        >
          How to Identify AI Images
        </button>
      </div>
    </div>
  )
}
