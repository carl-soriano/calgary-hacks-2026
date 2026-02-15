# Real or AI?

A game that helps players learn to tell AI-generated images apart from real ones. Built for **Calgary Hacks 2026**—designed to be accessible for all ages and great for playing with friends, family, or in the classroom.

---

## Features

- **Levels 0–5** — Easy mode (no timer) through to harder levels with more images and less time before the image blurs
- **Your own images** — Drop images into `src/assets/images/ai/` and `src/assets/images/real/`; the game picks randomly and uses the folder to set the correct answer
- **Optional AI comparison** — When configured, the app can show how an AI model would classify each image (via OpenAI Vision)
- **Tutorial & Learning Hub** — Short tutorial on what to look for, plus links to resources for kids and educators
- **Accessible & mobile-friendly** — Larger touch targets, light/dark mode, and a layout that works on phones and tablets

---

## Quick start

```bash
# Install dependencies
npm install

# Run locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Adding your own images

1. Put **AI-generated images** in `src/assets/images/ai/`
2. Put **real photos** in `src/assets/images/real/`
3. Supported formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`
4. Restart the dev server (or rebuild) so the game picks up the new files

The game will randomly choose images from these folders each round; the correct answer (AI vs Real) comes from which folder the image is in.

---

## OpenAI API key (optional)

The “AI said…” feature uses OpenAI Vision to classify images. The key is **never** sent from the browser.

- **Production (Vercel)**  
  In the project: **Settings → Environment Variables** add:
  - **Name:** `OPENAI_API_KEY`  
  - **Value:** your OpenAI API key  

  The serverless function at `/api/analyze-image` uses this; the key stays on the server.

- **Local development**  
  Copy `.env.example` to `.env` and set `VITE_OPENAI_API_KEY` for local testing.  
  **Do not commit `.env`**—it is gitignored.

Without a key, the game still works; the comparison feature is simply disabled.

---

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **CSS** with custom properties for light/dark theme
- **Vercel** for hosting; serverless function for the OpenAI API

---

## Project structure

| Path | Purpose |
|------|--------|
| `src/pages/` | Landing, Tutorial |
| `src/game/` | Game logic and UI |
| `src/components/` | NewsFeed, PlayerBadge, ThemeToggle, etc. |
| `src/constants/` | Level config, image pool, game images |
| `src/styles/` | Global, landing, game, hub, etc. |
| `api/` | Vercel serverless function for image analysis |

---

*Built for Calgary Hacks 2026.*
