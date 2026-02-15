import { useState, useCallback, useEffect, useMemo } from 'react'
import { getLevelImages } from '../../constants/gameImages'
import { getLevelConfig, type DifficultyLevel } from '../../constants/levelConfig'
import type { GameImage } from '../../types/game'
import type { GameMode } from '../../pages/Landing'
import '../../styles/game.css'

const HINT_SEEN_KEY = 'ai-real-game-hint-seen'

type Phase = 'playing' | 'score'

interface ImageGuessGameProps {
  mode?: GameMode
  difficulty?: DifficultyLevel
  onBackToHome?: () => void
  onGoToNewsFeed?: () => void
}

export default function ImageGuessGame({ mode = 'default', difficulty = 1, onBackToHome, onGoToNewsFeed }: ImageGuessGameProps) {
  const config = useMemo(() => getLevelConfig(difficulty), [difficulty])
  const { imageCount: levelCount, viewSeconds } = config

  const [levelImages, setLevelImages] = useState<GameImage[]>(() => getLevelImages(levelCount))
  const [levelIndex, setLevelIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [levelResults, setLevelResults] = useState<boolean[]>([])
  const [lastLevelCorrect, setLastLevelCorrect] = useState<boolean | null>(null)
  const [phase, setPhase] = useState<Phase>('playing')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [imageBlurred, setImageBlurred] = useState(mode === 'easy')
  const [secondsLeft, setSecondsLeft] = useState(viewSeconds)
  const [showHint, setShowHint] = useState(true)

  const isEasy = mode === 'easy'

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem(HINT_SEEN_KEY)) {
      setShowHint(false)
    }
  }, [])

  useEffect(() => {
    if (isEasy || phase !== 'playing') return
    setImageBlurred(false)
    setSecondsLeft(viewSeconds)
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setImageBlurred(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [levelIndex, phase, isEasy, viewSeconds])

  const dismissHint = useCallback(() => {
    setShowHint(false)
    try {
      localStorage.setItem(HINT_SEEN_KEY, '1')
    } catch {
      // ignore
    }
  }, [])

  const current = levelImages[levelIndex]
  const isLastLevel = levelIndex === levelCount - 1

  const canGuess = isEasy || imageBlurred

  const guess = useCallback(
    (userSaidAI: boolean) => {
      if (!current || isTransitioning || !canGuess) return
      const correct = current.isAI === userSaidAI
      setLevelResults((r) => [...r, correct])
      if (correct) setScore((s) => s + 1)
      if (isLastLevel) {
        setLastLevelCorrect(correct)
        setPhase('score')
      } else {
        setIsTransitioning(true)
        window.setTimeout(() => {
          setLevelIndex((i) => i + 1)
          if (!isEasy) setImageBlurred(false)
          setIsTransitioning(false)
        }, isEasy ? 0 : 350)
      }
    },
    [current, isLastLevel, isTransitioning, canGuess, isEasy]
  )

  const playAgain = useCallback(() => {
    setLevelImages(getLevelImages(levelCount))
    setLevelIndex(0)
    setScore(0)
    setLevelResults([])
    setLastLevelCorrect(null)
    setImageBlurred(isEasy)
    setSecondsLeft(viewSeconds)
    setPhase('playing')
  }, [isEasy, levelCount, viewSeconds])

  if (phase === 'score') {
    const results =
      levelResults.length === levelCount ? levelResults : [...levelResults, lastLevelCorrect ?? false]
    return (
      <div className="game game-score-screen">
        <h1 className="game-title">Your score</h1>
        <p className="game-score-value">{score} / {levelCount}</p>
        <p className="game-score-label">
          {score === levelCount ? 'Perfect!' : score >= levelCount / 2 ? 'Nice job!' : 'Keep practicing!'}
        </p>
        <h2 className="game-results-heading">What you got right and wrong</h2>
        <ul className="game-results-list" aria-label="Results by level">
          {levelImages.map((img, i) => (
            <li
              key={img.id + i}
              className={`game-results-item ${results[i] ? 'game-results-item--correct' : 'game-results-item--wrong'}`}
            >
              <img src={img.src} alt="" className="game-results-thumb" />
              <div className="game-results-info">
                <span className="game-results-level">Image {i + 1}</span>
                <span className="game-results-verdict">{results[i] ? 'Correct' : 'Wrong'}</span>
                <span className="game-results-answer">{img.isAI ? 'AI-generated' : 'Real'}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="game-score-actions">
          <button type="button" className="game-btn game-btn-next" onClick={playAgain}>
            Play again
          </button>
          {onBackToHome && (
            <button type="button" className="game-btn game-btn-home" onClick={onBackToHome}>
              Back to home
            </button>
          )}
          {onGoToNewsFeed && (
            <button type="button" className="game-btn game-btn-learn" onClick={onGoToNewsFeed}>
              Learn more about AI
            </button>
          )}
        </div>
      </div>
    )
  }

  if (!current) return null

  return (
    <div className="game">
      <p className="game-level">Level {difficulty} · Image {levelIndex + 1} of {levelCount}</p>
      <div
        className="game-progress"
        role="progressbar"
        aria-valuenow={levelIndex + 1}
        aria-valuemin={1}
        aria-valuemax={levelCount}
        aria-label={`Image ${levelIndex + 1} of ${levelCount}`}
      >
        {Array.from({ length: levelCount }, (_, i) => (
          <span key={i} className={`game-progress-dot ${i <= levelIndex ? 'game-progress-dot--filled' : ''}`} />
        ))}
      </div>
      <h1 className="game-title">AI or Real?</h1>
      <p className="game-instruction">
        {isEasy ? 'Is this image AI-generated or real?' : `Look for ${viewSeconds} seconds, then it blurs. Choose from memory.`}
      </p>

      {!isEasy && showHint && levelIndex === 0 && (
        <div className="game-hint" role="status">
          <p className="game-hint-text">
            You get {viewSeconds} seconds per image. When it blurs, choose AI or Real from what you saw.
          </p>
          <button type="button" className="game-hint-dismiss" onClick={dismissHint} aria-label="Dismiss hint">
            Got it
          </button>
        </div>
      )}

      <div className={`game-image-wrap ${isEasy ? '' : 'game-image-wrap--timer'}`}>
        <img src={current.src} alt="" className={`game-image ${isEasy ? '' : 'game-image-sharp'}`} />
        {!isEasy && imageBlurred && (
          <div
            className="game-image-blur"
            style={{ backgroundImage: `url(${current.src})` }}
            aria-hidden
          />
        )}
        {!isEasy && isTransitioning && (
          <div className="game-transition" aria-hidden>
            <span className="game-transition-text">Next image…</span>
          </div>
        )}
      </div>

      {!isEasy && !imageBlurred && secondsLeft > 0 ? (
        <p className="game-timer" aria-live="polite">
          <span className="game-timer-number">{secondsLeft}</span>
          <span className="game-timer-label"> seconds left</span>
        </p>
      ) : (
        <p className="game-reveals-left">
          {canGuess ? 'Now choose:' : !isEasy ? `Look… ${secondsLeft}s left` : 'Choose:'}
        </p>
      )}

      <div className={`game-actions ${!canGuess ? 'game-actions--disabled' : ''}`}>
        <button
          type="button"
          className="game-btn game-btn-real"
          onClick={() => guess(false)}
          disabled={isTransitioning || !canGuess}
        >
          Real
        </button>
        <button
          type="button"
          className="game-btn game-btn-ai"
          onClick={() => guess(true)}
          disabled={isTransitioning || !canGuess}
        >
          AI
        </button>
      </div>
    </div>
  )
}
