import { useState } from 'react'
import Landing from './pages/Landing'
import ImageGuessGame from './game/components/ImageGuessGame'

function App() {
  const [started, setStarted] = useState(false)

  return (
    <main>
      {started ? (
        <ImageGuessGame onBackToHome={() => setStarted(false)} />
      ) : (
        <Landing onStart={() => setStarted(true)} />
      )}
    </main>
  )
}

export default App
