import '../styles/landing.css'
import '../styles/tutorial.css'
import { useState, Children, isValidElement, ReactNode } from 'react'

interface TutorialProps {
  onClose: () => void,
  children?: ReactNode | ReactNode[]
}

export default function Tutorial({ onClose, children }: TutorialProps) {
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

  function goNext() {
    setIndex(i => Math.min(i + 1, last))
  }

  function goPrev() {
    setIndex(i => Math.max(i - 1, 0))
  }

  const current = panels[index]

  return (
    <div className="landing tutorial">
      <div className="tutorial-header">
        <button type="button" className="landing-cta" onClick={onClose}>Back to Home</button>
        <div className="tutorial-progress">{index + 1} / {panels.length}</div>
      </div>

      <div className="landing-content tutorial-panel">
        {isValidElement(current)
          ? current
          : <div>{String(current)}</div>
        }
      </div>

      <div className="tutorial-nav">
        <div className="nav-slot nav-left">
          {index > 0 && (
            <button type="button" className="landing-cta" onClick={goPrev}>←</button>
          )}
        </div>

        <div className="nav-slot nav-right">
          {index < last && (
            <button type="button" className="landing-cta" onClick={goNext}>→</button>
          )}
        </div>
      </div>
    </div>
  )
}
