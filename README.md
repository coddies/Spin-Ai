# 🎡 SpinWheel AI - AI Powered Wheel Spinner

Spin Smarter — AI Fills Your Wheel Instantly! Enter any topic and AI will fill the wheel automatically.

## Features
- **AI-Powered Generation**: Instantly fills your wheel based on any prompt using the Groq API with robust multi-model fallback chaining (llama3-8b, llama-3.1-8b, gemma2, llama-3.3, and mixtral).
- **LocalStorage State Persistence**: Saves and restores custom wheel items automatically in the browser (`spin-ai-items-v1`), keeping manual additions and AI results safe across reloads.
- **Elimination Mode**: Allows users to remove winning items from the wheel directly from the Winner celebration popup to prevent duplicate picks.
- **Ticking & Winner Sound Effects**: Premium audio feedback using the Web Audio API (synthesizer ticks on segment pass, major chords on result).
- **Responsive Mobile Ordering**: Optimizes mobile viewports to display the spinner wheel at the top (above the fold) and places the AI Panel below.
- **Legal & Meta Overhaul**: Integrated modal screens for About, Contact, Privacy Policy, and Terms of Service, along with full SEO open-graph tags, WebApplication JSON-LD schema, `robots.txt`, and `sitemap.xml`.

## Setup Locally

1. Clone the repo:
```bash
git clone https://github.com/coddies/Spin-Ai.git
cd spin-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
cp .env.example .env
```

4. Add your Groq API key in .env:
```text
GROQ_API_KEY=your_key_here
```

5. Run locally:
```bash
npm run dev
```

## Deployment

### Deploy on Vercel
1. Fork this repository.
2. Go to vercel.com → New Project.
3. Import your GitHub repository.
4. In Environment Variables add:
   `GROQ_API_KEY` = *your_actual_groq_key*
   *(Note: No `VITE_` prefix is needed because it runs serverless in /api/groq.js).*
5. Click Deploy.
6. Done! ✅

### Other Hosting
- Build: `npm run build`
- Upload `dist/` folder to hosting.

## Tech Stack
- React + Vite
- Tailwind CSS
- Groq API (llama3-8b-8192 with auto-fallback)
- Canvas Confetti
