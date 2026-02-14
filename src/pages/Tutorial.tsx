import '../styles/landing.css'
import '../styles/tutorial.css'

interface TutorialProps {
  onClose: () => void,
}

export default function Tutorial({ onClose }: TutorialProps) {
  return (
    <div className="landing tutorial">
    <button type="button" className="landing-cta" onClick={onClose}>Back to Home</button>

      <div className="landing-content">
        <h1 className="landing-title">How to Identify AI Images</h1>
        <p className="landing-tagline">Helpful tips to spot AI-generated imagery:</p>
        <ul>
          <li>Look for inconsistent lighting and shadows.</li>
          <li>Check for unnatural textures or distorted hands.</li>
          <li>Examine fine details at edges and hairlines.</li>
          <li>Watch for repeated patterns or odd artifacts.</li>
        </ul>
      </div>

    <div className="tutorial-nav">
      <button type="button" className="landing-cta" onClick={onClose}>←</button>
      <button type="button" className="landing-cta" onClick={onClose}>→</button>
    </div>

    </div>
  )
}
