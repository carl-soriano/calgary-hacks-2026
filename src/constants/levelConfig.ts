/**
 * Level 0 = Easy (no timer, no blur). Levels 1–5 = timed, more images and less time as you go.
 */
export type DifficultyLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface LevelConfig {
  /** Number of images in this round */
  imageCount: number
  /** Seconds to view each image before it blurs (0 = easy mode, no timer) */
  viewSeconds: number
}

export const LEVEL_CONFIGS: Record<DifficultyLevel, LevelConfig> = {
  0: { imageCount: 5, viewSeconds: 0 },
  1: { imageCount: 5, viewSeconds: 5 },
  2: { imageCount: 6, viewSeconds: 4 },
  3: { imageCount: 8, viewSeconds: 3 },
  4: { imageCount: 10, viewSeconds: 2 },
  5: { imageCount: 12, viewSeconds: 1 },
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [0, 1, 2, 3, 4, 5]

export function getLevelConfig(difficulty: DifficultyLevel): LevelConfig {
  return LEVEL_CONFIGS[difficulty]
}
