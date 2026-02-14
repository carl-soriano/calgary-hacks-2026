import { useState, useCallback } from 'react'
import { getLevelImages, LEVELS } from '../../constants/gameImages'
import type { GameImage } from '../../types/game'
import '../../styles/game.css'

type Result = 'correct' | 'wrong'
type Phase = 'playing' | 'score'

export default function ImageGuessGame() {
  const [levelImages, setLevelImages] = useState<GameImage[]>(() => getLevelImages())
  const [levelIndex, setLevelIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const [phase, setPhase] = useState<Phase>('playing')

  const current = levelImages[levelIndex]
  const isLastLevel = levelIndex === LEVELS - 1

  const guess = useCallback((userSaidAI: boolean) => {
    if (!current) return
    const correct = current.isAI === userSaidAI
    setResult(correct ? 'correct' : 'wrong')
    if (correct) setScore((s) => s + 1)
  }, [current])

  const goNext = useCallback(() => {
    if (isLastLevel) {
      setPhase('score')
      return
    }
    setLevelIndex((i) => i + 1)
    setResult(null)
  }, [isLastLevel])

  const playAgain = useCallback(() => {
    setLevelImages(getLevelImages())
    setLevelIndex(0)
    setScore(0)
    setResult(null)
    setPhase('playing')
  }, [])

  if (phase === 'score') {
    return (
      <div className="game game-score-screen">
        <h1 className="game-title">Your score</h1>
        <p className="game-score-value">{score} / {LEVELS}</p>
        <p className="game-score-label">
          {score === LEVELS ? 'Perfect!' : score >= LEVELS / 2 ? 'Nice job!' : 'Keep practicing!'}
        </p>
        <button type="button" className="game-btn game-btn-next" onClick={playAgain}>
          Play again
        </button>
      </div>
    )
  }

  if (!current) return null

  return (
    <div className="game">
      <p className="game-level">Level {levelIndex + 1} of {LEVELS}</p>
      <h1 className="game-title">AI or Real?</h1>
      <p className="game-instruction">Is this image AI-generated?</p>

      <div className="game-image-wrap">
        <img src={current.src} alt="Guess if AI or real" className="game-image" />
      </div>

      {result === null ? (
        <div className="game-actions">
          <button type="button" className="game-btn game-btn-no" onClick={() => guess(false)}>
            No
          </button>
          <button type="button" className="game-btn game-btn-yes" onClick={() => guess(true)}>
            Yes
          </button>
        </div>
      ) : (
        <div className="game-result">
          <p className={`game-result-text ${result}`}>
            {result === 'correct' ? 'Correct!' : 'Wrong!'}
          </p>
          <p className="game-result-answer">
            This image is {current.isAI ? 'AI-generated' : 'real'}.
          </p>
          <button type="button" className="game-btn game-btn-next" onClick={goNext}>
            {isLastLevel ? 'See score' : 'Next level'}
          </button>
        </div>
      )}
    </div>
  )
}
