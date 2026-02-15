# calgary-hacks-2026
Our Project for Calgary Hacks 2026

## Protecting the OpenAI API key (Vercel)

The app uses OpenAI only for the optional “AI said…” analysis. **Never commit an API key to the repo.**

- **Production (Vercel):** Set the key in the dashboard: **Project → Settings → Environment Variables**. Add `OPENAI_API_KEY` with your key. The key is only used by the serverless function `/api/analyze-image`, so it never appears in the browser or the repo.
- **Local dev:** Copy `.env.example` to `.env` and add `VITE_OPENAI_API_KEY` for local testing. `.env` is gitignored; do not commit it.
