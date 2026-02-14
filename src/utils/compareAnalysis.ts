import type { ImageAnalysisResult } from '../types/analysis'
import type { LevelComparison } from '../types/analysis'

/**
 * Build a per-level comparison for the results screen: user choice, ground truth,
 * and optional AI analysis. Use when you have analysis results from useImageAnalysis
 * or analyzeImage() to show "You said X, the AI said Y, correct was Z".
 */
export function buildLevelComparison(
  userSaidAI: boolean,
  correctIsAI: boolean,
  analysis: ImageAnalysisResult | null | undefined
): LevelComparison {
  const userCorrect = userSaidAI === correctIsAI
  const analysisCorrect = analysis ? analysis.isAI === correctIsAI : undefined
  return {
    userSaidAI,
    correctIsAI,
    userCorrect,
    analysis: analysis ?? undefined,
    analysisCorrect,
  }
}
