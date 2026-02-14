import { useState } from 'react'
import Landing from './pages/Landing'
import type { GameMode } from './pages/Landing'
import ImageGuessGame from './game/components/ImageGuessGame'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [started, setStarted] = useState(false)
  const [mode, setMode] = useState<GameMode>('default')

  return (
    <main>
      <ThemeToggle />
      {started ? (
        <ImageGuessGame mode={mode} onBackToHome={() => setStarted(false)} />
      ) : (
        <Landing onStart={(m) => { setMode(m); setStarted(true) }} />
      )}
    </main>
  )
}

export default App
