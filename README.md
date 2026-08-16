# 🎡 SpinWheel AI - AI Powered Wheel Spinner

Spin Smarter — AI Fills Your Wheel Instantly! Enter any topic and AI will fill the wheel automatically.

## Features
- AI-powered wheel generation (Groq API) with automatic model fallback
- Colorful animated spinner
- Ad monetization ready
- Mobile responsive
- **No usage limits — Spin all day!**

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
