import type { ImageAnalysisResult } from '../types/analysis'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Get the OpenAI API key from env. Vite exposes env vars prefixed with VITE_.
 * Set in .env: VITE_OPENAI_API_KEY=sk-...
 */
function getApiKey(): string | undefined {
  return typeof import.meta !== 'undefined' && import.meta.env
    ? (import.meta.env.VITE_OPENAI_API_KEY as string | undefined)
    : undefined
}

/**
 * Analyze an image with OpenAI Vision (e.g. gpt-4o or gpt-4-vision) to predict
 * whether it is AI-generated or real. Use this to compare the model's answer
 * to the user's choice and ground truth.
 *
 * Requires VITE_OPENAI_API_KEY in .env. If missing, returns null (no analysis).
 */
export async function analyzeImage(imageUrl: string): Promise<ImageAnalysisResult | null> {
  const apiKey = getApiKey()
  if (!apiKey) {
    return null
  }

  const payload = {
    model: 'gpt-4o',
    max_tokens: 300,
    messages: [
      {
        role: 'user' as const,
        content: [
          {
            type: 'text' as const,
            text: `Look at this image and decide: is it AI-generated (e.g. DALL·E, Midjourney, Stable Diffusion) or a real photograph? Reply with a JSON object only, no markdown: {"isAI": true or false, "confidence": 0.0 to 1.0, "reasoning": "one short sentence"}`,
          },
          {
            type: 'image_url' as const,
            image_url: { url: imageUrl },
          },
        ],
      },
    ],
  }

  try {
    const res = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return null
    }

    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
    const content = data.choices?.[0]?.message?.content
    if (!content) return null

    const parsed = JSON.parse(content.trim()) as {
      isAI?: boolean
      confidence?: number
      reasoning?: string
    }
    return {
      isAI: Boolean(parsed.isAI),
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : undefined,
      reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : undefined,
    }
  } catch {
    return null
  }
}

/** Check if analysis is available (API key is set). */
export function isAnalysisAvailable(): boolean {
  return Boolean(getApiKey())
}
