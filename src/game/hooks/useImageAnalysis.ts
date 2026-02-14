import { useState, useCallback } from 'react'
import { analyzeImage, isAnalysisAvailable } from '../../services/imageAnalysis'
import type { ImageAnalysisResult } from '../../types/analysis'

/**
 * Hook to run OpenAI image analysis and compare to user/ground truth.
 * Use in the game when you want to analyze each image (e.g. when blur happens)
 * and later show "AI said X, you said Y" on the results screen.
 */
export function useImageAnalysis() {
  const [result, setResult] = useState<ImageAnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const analyze = useCallback(async (imageUrl: string) => {
    if (!isAnalysisAvailable()) {
      setResult(null)
      return null
    }
    setLoading(true)
    setError(null)
    try {
      const analysis = await analyzeImage(imageUrl)
      setResult(analysis)
      return analysis
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e))
      setError(err)
      setResult(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    analyze,
    result,
    loading,
    error,
    reset,
    available: isAnalysisAvailable(),
  }
}
