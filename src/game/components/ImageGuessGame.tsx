import { useState, useCallback } from 'react'
import { getLevelImages, LEVELS } from '../../constants/gameImages'
import type { GameImage } from '../../types/game'
import '../../styles/game.css'

type Phase = 'playing' | 'score'

export default function ImageGuessGame() {
  const [levelImages, setLevelImages] = useState<GameImage[]>(() => getLevelImages())
  const [levelIndex, setLevelIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [levelResults, setLevelResults] = useState<boolean[]>([])
  const [lastLevelCorrect, setLastLevelCorrect] = useState<boolean | null>(null)
  const [phase, setPhase] = useState<Phase>('playing')

  const current = levelImages[levelIndex]
  const isLastLevel = levelIndex === LEVELS - 1

  const guess = useCallback((userSaidAI: boolean) => {
    if (!current) return
    const correct = current.isAI === userSaidAI
    setLevelResults((r) => [...r, correct])
    if (correct) setScore((s) => s + 1)
    if (isLastLevel) {
      setLastLevelCorrect(correct)
      setPhase('score')
    } else {
      setLevelIndex((i) => i + 1)
    }
  }, [current, isLastLevel])

  const playAgain = useCallback(() => {
    setLevelImages(getLevelImages())
    setLevelIndex(0)
    setScore(0)
    setLevelResults([])
    setLastLevelCorrect(null)
    setPhase('playing')
  }, [])

  if (phase === 'score') {
    const results =
      levelResults.length === LEVELS ? levelResults : [...levelResults, lastLevelCorrect ?? false]
    return (
      <div className="game game-score-screen">
        <h1 className="game-title">Your score</h1>
        <p className="game-score-value">{score} / {LEVELS}</p>
        <p className="game-score-label">
          {score === LEVELS ? 'Perfect!' : score >= LEVELS / 2 ? 'Nice job!' : 'Keep practicing!'}
        </p>
        <ul className="game-results-list" aria-label="Results by level">
          {levelImages.map((img, i) => (
            <li key={img.id + i} className={`game-results-item ${results[i] ? 'game-results-item--correct' : 'game-results-item--wrong'}`}>
              <img src={img.src} alt="" className="game-results-thumb" />
              <div className="game-results-info">
                <span className="game-results-level">Level {i + 1}</span>
                <span className="game-results-verdict">{results[i] ? 'Correct' : 'Wrong'}</span>
                <span className="game-results-answer">{img.isAI ? 'AI-generated' : 'Real'}</span>
              </div>
            </li>
          ))}
        </ul>
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

      <div className="game-actions">
        <button type="button" className="game-btn game-btn-no" onClick={() => guess(false)}>
          No
        </button>
        <button type="button" className="game-btn game-btn-yes" onClick={() => guess(true)}>
          Yes
        </button>
      </div>
    </div>
  )
}
