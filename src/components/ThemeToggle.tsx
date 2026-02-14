import { useTheme } from '../context/ThemeContext'
import '../styles/theme-toggle.css'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="theme-toggle-icon" aria-hidden>
        {isDark ? '☀️' : '🌙'}
      </span>
      <span className="theme-toggle-label">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
