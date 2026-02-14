import type { GameImage } from '../types/game'

const GAME_IMAGES: readonly GameImage[] = [
  { id: '1', src: 'https://picsum.photos/seed/real1/500/400', isAI: false },
  { id: '2', src: 'https://picsum.photos/seed/real2/500/400', isAI: false },
  { id: '3', src: 'https://picsum.photos/seed/real3/500/400', isAI: false },
  { id: '4', src: 'https://picsum.photos/seed/ai1/500/400', isAI: true },
  { id: '5', src: 'https://picsum.photos/seed/ai2/500/400', isAI: true },
  { id: '6', src: 'https://picsum.photos/seed/ai3/500/400', isAI: true },
]

export const LEVELS = 5

export function getRandomImage(): GameImage {
  const index = Math.floor(Math.random() * GAME_IMAGES.length)
  return GAME_IMAGES[index] as GameImage
}

export function getLevelImages(count: number = LEVELS): GameImage[] {
  return Array.from({ length: count }, () => getRandomImage())
}

export { GAME_IMAGES }