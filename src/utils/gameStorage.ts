/**
 * Store game data in a cookie (no database). Keeps payload small for the ~4KB cookie limit.
 */
import { getCookie, setCookie } from './cookies'

const COOKIE_NAME = 'ai_real_game'

export interface StoredGameData {
  /** Last game: score, total, difficulty, timestamp */
  lastGame?: {
    score: number
    total: number
    difficulty: number
    timestamp: number
  }
  /** Optional: total games played, total correct (for simple stats) */
  stats?: {
    gamesPlayed: number
    totalCorrect: number
    totalGuessed: number
  }
}

const defaultData: StoredGameData = {}

export function getStoredGameData(): StoredGameData {
  try {
    const raw = getCookie(COOKIE_NAME)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw) as StoredGameData
    return {
      lastGame: parsed.lastGame,
      stats: parsed.stats,
    }
  } catch {
    return defaultData
  }
}

export function setStoredGameData(data: StoredGameData): void {
  try {
    const payload = JSON.stringify(data)
    if (payload.length > 3800) {
      // Leave headroom under 4KB
      setStoredGameData({ lastGame: data.lastGame })
      return
    }
    setCookie(COOKIE_NAME, payload)
  } catch {
    // ignore
  }
}

/** Call after a game ends to save last result and update stats. */
export function saveGameResult(score: number, total: number, difficulty: number): void {
  const current = getStoredGameData()
  const now = Date.now()
  const lastGame = { score, total, difficulty, timestamp: now }
  const stats = current.stats ?? { gamesPlayed: 0, totalCorrect: 0, totalGuessed: 0 }
  setStoredGameData({
    lastGame,
    stats: {
      gamesPlayed: stats.gamesPlayed + 1,
      totalCorrect: stats.totalCorrect + score,
      totalGuessed: stats.totalGuessed + total,
    },
  })
}
