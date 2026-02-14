/**
 * Result of AI (e.g. OpenAI Vision) analyzing an image for "AI-generated or real".
 * Used to compare the model's answer to the user's choice and ground truth.
 */
export interface ImageAnalysisResult {
  /** Model's prediction: true = AI-generated, false = real */
  isAI: boolean
  /** 0–1, optional */
  confidence?: number
  /** Optional short reasoning (e.g. from GPT-4 Vision) */
  reasoning?: string
}

/**
 * Per-level comparison: user choice, ground truth, and optional AI analysis.
 * Use on the results screen to show "You said X, the AI said Y, correct answer was Z".
 */
export interface LevelComparison {
  userSaidAI: boolean
  correctIsAI: boolean
  userCorrect: boolean
  /** Set when OpenAI analysis is enabled */
  analysis?: ImageAnalysisResult
  /** Whether the AI model got it right (if analysis present) */
  analysisCorrect?: boolean
}
