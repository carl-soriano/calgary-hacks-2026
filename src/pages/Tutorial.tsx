import '../styles/landing.css'
import '../styles/hub.css'
import '../styles/tutorial.css'
import { useState, Children, isValidElement, ReactNode, cloneElement } from 'react'

interface TutorialProps {
  onClose: () => void,
  children?: ReactNode | ReactNode[],
  onAnswer: (correct: boolean) => void,
}

export default function Tutorial({ onClose, children, onAnswer }: TutorialProps) {
  // Normalize children into an array of panels (ReactNodes)
  const childArray = children ? Children.toArray(children) : []

  // Fallback panels (kept simple); when `children` are provided, these are ignored.
  const fallback: ReactNode[] = [
    (
      <div key="overview">
        <h2>What is AI?</h2>
        <p>AI is created when people teach machines to think, solve problems, and make decisions.</p>
      </div>
    ),
    (
      <div key="details">
        <h2>Look for details</h2>
        <p>Check lighting, shadows, and small distortions.</p>
      </div>
    ),
    (
      <div key="artifacts">
        <h2>Artifacts</h2>
        <p>Search for repeating patterns and odd textures.</p>
      </div>
    ),
  ]

  const panels = childArray.length > 0 ? childArray : fallback

  const [index, setIndex] = useState(0)
  const last = panels.length - 1
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null)

  function goNext() {
    setIndex(i => Math.min(i + 1, last))
  }

  function goPrev() {
    setIndex(i => Math.max(i - 1, 0))
  }

  function handleAnswer(correct: boolean) {
    if (typeof onAnswer === 'function') onAnswer(correct)
    setLastAnswer(correct)
    goNext()
  }

  const current = panels[index]

  return (
    <div className="landing tutorial">
      <div className="tutorial-header">
        <button type="button" className="hub-back-btn hub-back-btn--placeholder" aria-hidden tabIndex={-1}>← Home</button>
        <button type="button" className="hub-back-btn hub-back-btn--fixed" onClick={onClose}>← Home</button>
        <div className="tutorial-progress hub-muted">{index + 1} / {panels.length}</div>
      </div>

      <div className="landing-content tutorial-panel">
        {isValidElement(current)
          ? cloneElement(current, { onAnswer: handleAnswer, onNext: goNext, lastAnswer })
          : <div>{String(current)}</div>
        }
      </div>

      <div className="tutorial-nav">
        <div className="nav-slot nav-left">
          {index > 0 && (
            <button type="button" className="hub-back-btn" onClick={goPrev}>←</button>
          )}
        </div>

        <div className="nav-slot nav-right">
          {index < last && (
            <button type="button" className="hub-back-btn" onClick={goNext}>→</button>
          )}
        </div>
      </div>
    </div>
  )
}
