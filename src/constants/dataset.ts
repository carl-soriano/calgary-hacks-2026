import type { GameImage } from '../types/game'
import type { DatasetImage } from '../types/dataset'
import { getLevelImages as getFallbackLevelImages, LEVELS } from './gameImages'

/**
 * Future: Load AI vs Real images from your dataset (JSON file, API, etc.).
 * For now returns the same fallback as gameImages so the game still works.
 *
 * Example future usage:
 *   const data = await fetch('/data/ai-vs-real.json').then(r => r.json())
 *   return data.images as DatasetImage[]
 */
export async function loadDataset(): Promise<DatasetImage[]> {
  // TODO: Replace with real dataset fetch, e.g.:
  // const res = await fetch('/dataset/ai-vs-real.json')
  // const json = await res.json()
  // return json.images
  return []
}

/**
 * Get images for a game round. Uses dataset if available, otherwise fallback.
 * Converts DatasetImage → GameImage so the game component stays unchanged.
 */
export function getDatasetLevelImages(count: number = LEVELS): GameImage[] {
  // Future: use in-memory dataset after loadDataset() has been called,
  // or pass preloaded dataset from App/context.
  return getFallbackLevelImages(count)
}

export { LEVELS }
export type { DatasetImage }
