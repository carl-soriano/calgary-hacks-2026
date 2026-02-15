import type { GameImage } from '../types/game'

/**
 * Load images from src/assets/images/ai/ and src/assets/images/real/.
 * Answers (isAI) are set by folder: ai → true, real → false.
 * Uses Vite's import.meta.glob; add images and restart dev server to pick them up.
 */

// Globs relative to this file (src/constants/) — literal pattern required by Vite
const aiGlob = import.meta.glob<string>(
  '../assets/images/ai/*.{png,jpg,jpeg,gif,webp}',
  { query: '?url', import: 'default', eager: true }
)
const realGlob = import.meta.glob<string>(
  '../assets/images/real/*.{png,jpg,jpeg,gif,webp}',
  { query: '?url', import: 'default', eager: true }
)

function globToImages(record: Record<string, string>, isAI: boolean): GameImage[] {
  return Object.entries(record).map(([path], i) => ({
    id: `${isAI ? 'ai' : 'real'}-${path}-${i}`,
    src: record[path],
    isAI,
  }))
}

let _aiImages: GameImage[] | null = null
let _realImages: GameImage[] | null = null

function getPool(): { ai: GameImage[]; real: GameImage[] } {
  if (_aiImages === null) _aiImages = globToImages(aiGlob, true)
  if (_realImages === null) _realImages = globToImages(realGlob, false)
  return { ai: _aiImages, real: _realImages }
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/**
 * Whether the folder-based image pool has at least one image (so we can use it for the game).
 */
export function hasPoolImages(): boolean {
  const { ai, real } = getPool()
  return ai.length > 0 || real.length > 0
}

/**
 * Get a random selection of images for a round. Answers (isAI) come from which folder
 * each image is from. Uses level's count; if pool has fewer images, we reuse (shuffle again).
 */
export function getLevelImagesFromPool(count: number): GameImage[] {
  const { ai, real } = getPool()
  const combined = shuffle([...ai, ...real])
  if (combined.length === 0) return []

  const result: GameImage[] = []
  for (let i = 0; i < count; i++) {
    result.push(combined[i % combined.length])
  }
  return shuffle(result)
}
