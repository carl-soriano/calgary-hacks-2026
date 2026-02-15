/**
 * Vercel serverless function: analyze an image with OpenAI Vision.
 * Keeps OPENAI_API_KEY on the server only. Set in Vercel: Project → Settings → Environment Variables.
 */

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export const config = {
  runtime: 'nodejs',
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return Response.json(
      { error: 'OPENAI_API_KEY not configured' },
      { status: 503 }
    )
  }

  let body: { imageUrl: string }
  try {
    body = (await request.json()) as { imageUrl: string }
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const imageUrl = body?.imageUrl
  if (!imageUrl || typeof imageUrl !== 'string') {
    return Response.json({ error: 'Missing imageUrl' }, { status: 400 })
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
      return Response.json(
        { error: 'OpenAI API error', status: res.status },
        { status: 502 }
      )
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    }
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      return Response.json({ error: 'No content from OpenAI' }, { status: 502 })
    }

    const parsed = JSON.parse(content.trim()) as {
      isAI?: boolean
      confidence?: number
      reasoning?: string
    }
    return Response.json({
      isAI: Boolean(parsed.isAI),
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : undefined,
      reasoning: typeof parsed.reasoning === 'string' ? parsed.reasoning : undefined,
    })
  } catch (e) {
    console.error('analyze-image error:', e)
    return Response.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
