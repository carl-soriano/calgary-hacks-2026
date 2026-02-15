import type { ImageAnalysisResult } from '../types/analysis'

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

/** Client-side key only for local dev (never commit .env). Production uses /api/analyze-image. */
function getClientApiKey(): string | undefined {
  return typeof import.meta !== 'undefined' && import.meta.env
    ? (import.meta.env.VITE_OPENAI_API_KEY as string | undefined)
    : undefined
}

/** Production: call our serverless API so the key stays on the server. */
async function analyzeViaApi(urlForApi: string): Promise<ImageAnalysisResult | null> {
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  try {
    const res = await fetch(`${base}/api/analyze-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: urlForApi }),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { isAI?: boolean; confidence?: number; reasoning?: string }
    return {
      isAI: Boolean(data.isAI),
      confidence: typeof data.confidence === 'number' ? data.confidence : undefined,
      reasoning: typeof data.reasoning === 'string' ? data.reasoning : undefined,
    }
  } catch {
    return null
  }
}

/** Dev only: call OpenAI from the client (key in .env, never commit). */
async function analyzeDirect(urlForApi: string): Promise<ImageAnalysisResult | null> {
  const apiKey = getClientApiKey()
  if (!apiKey) return null
  try {
    const res = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
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
              { type: 'image_url' as const, image_url: { url: urlForApi } },
            ],
          },
        ],
      }),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> }
    const content = data.choices?.[0]?.message?.content
    if (!content) return null
    const parsed = JSON.parse(content.trim()) as { isAI?: boolean; confidence?: number; reasoning?: string }
    return {
      isAI: Boolean(parsed.isAI),
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : undefined,
      reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : undefined,
    }
  } catch {
    return null
  }
}

/**
 * Analyze an image with OpenAI Vision. In production uses /api/analyze-image (key on server).
 * In dev can use VITE_OPENAI_API_KEY from .env for local testing (do not commit .env).
 */
export async function analyzeImage(imageUrl: string): Promise<ImageAnalysisResult | null> {
  const urlForApi = await imageUrlForApi(imageUrl)
  const isDev = import.meta.env.DEV
  const hasClientKey = Boolean(getClientApiKey())
  if (isDev && hasClientKey) {
    return analyzeDirect(urlForApi)
  }
  return analyzeViaApi(urlForApi)
}

/**
 * Analysis is available if we have a client key (dev) or we're in production (API route has the key).
 * In production we can't know without calling the API; we assume the route is configured.
 */
export function isAnalysisAvailable(): boolean {
  if (import.meta.env.DEV) {
    return Boolean(getClientApiKey())
  }
  return true
}

/**
 * Convert image src to a URL OpenAI can access. Public URLs used as-is;
 * relative/blob URLs are fetched and converted to a base64 data URL.
 */
async function imageUrlForApi(src: string): Promise<string> {
  if (typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:'))) {
    return src
  }
  try {
    const res = await fetch(src, { mode: 'cors' })
    const blob = await res.blob()
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = () => reject(new Error('Failed to read image'))
      reader.readAsDataURL(blob)
    })
  } catch {
    return src
  }
}
