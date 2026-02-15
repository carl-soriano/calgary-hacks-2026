import { useState } from 'react'
import '../styles/player.css'

interface NamePromptProps {
  onSubmit: (name: string) => void
}

export default function NamePrompt({ onSubmit }: NamePromptProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <div className="name-prompt">
      <div className="name-prompt__card">
        <h1 className="name-prompt__title">Welcome!</h1>
        <p className="name-prompt__subtitle">What should we call you?</p>
        <form className="name-prompt__form" onSubmit={handleSubmit}>
          <input
            className="name-prompt__input"
            type="text"
            placeholder="Enter your name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={24}
            autoFocus
          />
          <button
            type="submit"
            className="name-prompt__btn"
            disabled={!value.trim()}
          >
            Let's go
          </button>
        </form>
      </div>
    </div>
  )
}
