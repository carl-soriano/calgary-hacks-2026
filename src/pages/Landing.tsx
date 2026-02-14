import '../styles/landing.css'
import { useState } from 'react'
import Tutorial from './Tutorial'

interface LandingProps {
  onStart: () => void,
}

export default function Landing({ onStart }: LandingProps) {
  const [showTutorial, setShowTutorial] = useState(false)

  if (showTutorial) {
    return <Tutorial onClose={() => setShowTutorial(false)} />
  }

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
          onClick={() => setShowTutorial(true)}
        >
          How to Identify AI Images
        </button>
      </div>
    </div>
  )
}
