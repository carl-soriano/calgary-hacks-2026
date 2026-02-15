import { useState } from 'react'
import Landing from './pages/Landing'
import type { GameMode } from './pages/Landing'
import type { DifficultyLevel } from './constants/levelConfig'
import ImageGuessGame from './game/components/ImageGuessGame'
import ThemeToggle from './components/ThemeToggle'
import NewsFeed from './components/NewsFeed'
import PlayerBadge from './components/PlayerBadge'
import NamePrompt from './components/NamePrompt'
import { usePlayerProfile } from './hooks/usePlayerProfile'

type Page = 'landing' | 'game' | 'newsfeed'

function App() {
  const [page, setPage] = useState<Page>('landing')
  const [mode, setMode] = useState<GameMode>('default')
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(0)
  const { profile, setName, recordPerfectGame } = usePlayerProfile()

  if (!profile) {
    return (
      <main>
        <NamePrompt onSubmit={setName} />
      </main>
    )
  }

  return (
    <main>
      <PlayerBadge profile={profile} />
      <ThemeToggle />
      {page === 'game' && (
        <ImageGuessGame
          mode={mode}
          difficulty={difficulty}
          onBackToHome={() => setPage('landing')}
          onGoToNewsFeed={() => setPage('newsfeed')}
          onPerfectScore={recordPerfectGame}
        />
      )}
      {page === 'newsfeed' && (
        <NewsFeed onBackToHome={() => setPage('landing')} />
      )}
      {page === 'landing' && (
        <Landing
          onStart={(m, d) => {
            setMode(m)
            setDifficulty(d)
            setPage('game')
          }}
          onGoToNewsFeed={() => setPage('newsfeed')}
        />
      )}
    </main>
  )
}

export default App
