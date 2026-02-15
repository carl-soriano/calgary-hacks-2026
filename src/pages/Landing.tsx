import '../styles/landing.css'
import { useState, useEffect } from 'react'
import Tutorial from './Tutorial'
import { panels as tutorialPanels } from './TutorialContent'
import { LEVEL_CONFIGS, type DifficultyLevel } from '../constants/levelConfig'
import { getStoredGameData } from '../utils/gameStorage'

export type GameMode = 'default' | 'easy'

interface LandingProps {
  onStart: (mode: GameMode, difficulty: DifficultyLevel) => void
  onGoToNewsFeed?: () => void
}

const TITLE_LETTERS = ['R', 'E', 'A', 'L', ' ', 'O', 'R', ' ', 'A', 'I', '?']

export default function Landing({ onStart, onGoToNewsFeed }: LandingProps) {
  const [showTutorial, setShowTutorial] = useState(false)
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(1)
  const [storedData, setStoredData] = useState<ReturnType<typeof getStoredGameData> | null>(null)
  useEffect(() => {
    setStoredData(getStoredGameData())
  }, [])

  if (showTutorial) {
    return (
      <Tutorial onClose={() => setShowTutorial(false)}>
        {tutorialPanels.map((P, i) => (
          // Each entry in `tutorialPanels` is a component
          // render it as a child panel
          <P key={i} />
        ))}
      </Tutorial>
    )
  }

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
          Pick a level: more images and less time as you go. Then the image blurs — choose AI or Real from memory.
        </p>
        <div className="landing-levels">
          <span className="landing-levels-label">Level</span>
          {( [1, 2, 3, 4, 5] as const ).map((d) => {
            const config = LEVEL_CONFIGS[d]
            return (
              <button
                key={d}
                type="button"
                className={`landing-level-btn ${difficulty === d ? 'landing-level-btn--active' : ''}`}
                onClick={() => setDifficulty(d)}
                title={`${config.imageCount} images, ${config.viewSeconds}s each`}
              >
                {d}
                <span className="landing-level-meta">{config.imageCount} imgs · {config.viewSeconds}s</span>
              </button>
            )
          })}
        </div>
        <div className="landing-actions">
          <button type="button" className="landing-cta" onClick={() => onStart('default', difficulty)}>
            Play
          </button>
          <button type="button" className="landing-cta landing-cta--secondary" onClick={() => onStart('easy', difficulty)}>
            Easy mode
          </button>
        </div>
        <p className="landing-easy-note">Easy: no timer, no blur — image stays visible.</p>
        {storedData?.lastGame && (
          <p className="landing-last-score" aria-live="polite">
            Last score: {storedData.lastGame.score}/{storedData.lastGame.total}
            {storedData.stats && storedData.stats.gamesPlayed > 1 && (
              <> · {storedData.stats.gamesPlayed} games played</>
            )}
          </p>
        )}
      </div>
      <div className="landing-info">
        <button
          type="button"
          className="landing-cta landing-cta--tertiary"
          onClick={() => setShowTutorial(true)}
        >
          Tutorial: How to Identify AI Images
        </button>
        {onGoToNewsFeed && (
          <button
            type="button"
            className="landing-cta landing-cta--tertiary"
            onClick={onGoToNewsFeed}
          >
            AI Learning Hub
          </button>
        )}
      </div>
    </div>
  )
}
