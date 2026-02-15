/**
 * Difficulty levels 1–5. Level 1 = easiest (most time, fewest images);
 * Level 5 = hardest (least time, most images).
 * Designed for a pool of 200 images (100 real, 100 AI).
 */
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5

export interface LevelConfig {
  /** Number of images in this round */
  imageCount: number
  /** Seconds to view each image before it blurs */
  viewSeconds: number
}

export const LEVEL_CONFIGS: Record<DifficultyLevel, LevelConfig> = {
  1: { imageCount: 5, viewSeconds: 5 },
  2: { imageCount: 6, viewSeconds: 4 },
  3: { imageCount: 8, viewSeconds: 3 },
  4: { imageCount: 10, viewSeconds: 2 },
  5: { imageCount: 12, viewSeconds: 1 },
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [1, 2, 3, 4, 5]

export function getLevelConfig(difficulty: DifficultyLevel): LevelConfig {
  return LEVEL_CONFIGS[difficulty]
}
