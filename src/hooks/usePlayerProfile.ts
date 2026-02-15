import { useState, useCallback } from 'react'

const PLAYER_KEY = 'ai-real-player'

export const TIERS = [
  { name: 'Noob', minPerfect: 0 },
  { name: 'Apprentice', minPerfect: 1 },
  { name: 'Pro', minPerfect: 3 },
  { name: 'Master', minPerfect: 5 },
] as const

export type TierName = (typeof TIERS)[number]['name']

export interface PlayerProfile {
  name: string
  perfectGames: number
  tier: TierName
}

function getTier(perfectGames: number): TierName {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    const t = TIERS[i]
    if (t && perfectGames >= t.minPerfect) return t.name
  }
  return 'Noob'
}

function loadProfile(): PlayerProfile | null {
  try {
    const raw = localStorage.getItem(PLAYER_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as { name?: string; perfectGames?: number }
    if (!data.name) return null
    const perfectGames = typeof data.perfectGames === 'number' ? data.perfectGames : 0
    return { name: data.name, perfectGames, tier: getTier(perfectGames) }
  } catch {
    return null
  }
}

function saveProfile(profile: PlayerProfile) {
  try {
    localStorage.setItem(
      PLAYER_KEY,
      JSON.stringify({ name: profile.name, perfectGames: profile.perfectGames })
    )
  } catch {
    // storage unavailable
  }
}

export function usePlayerProfile() {
  const [profile, setProfile] = useState<PlayerProfile | null>(() => loadProfile())

  const setName = useCallback((name: string) => {
    const p: PlayerProfile = { name, perfectGames: 0, tier: 'Noob' }
    setProfile(p)
    saveProfile(p)
  }, [])

  const recordPerfectGame = useCallback(() => {
    setProfile((prev) => {
      if (!prev) return prev
      const perfectGames = prev.perfectGames + 1
      const updated: PlayerProfile = { ...prev, perfectGames, tier: getTier(perfectGames) }
      saveProfile(updated)
      return updated
    })
  }, [])

  return { profile, setName, recordPerfectGame }
}
