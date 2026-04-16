# 🎡 SpinAI - AI Powered Wheel Spinner

Spin smarter with AI! Enter any topic and AI will fill 
the wheel automatically.

## Features
- AI-powered wheel generation (Groq API)
- Colorful animated spinner
- Ad monetization ready
- Mobile responsive
- **No usage limits — Spin all day!**

## Setup Locally

1. Clone the repo:
git clone https://github.com/coddies/Spin-Ai.git
cd spin-ai

2. Install dependencies:
npm install

3. Create .env file:
cp .env.example .env

4. Add your Groq API key in .env:
VITE_GROQ_API_KEY=your_actual_key_here

5. Run locally:
npm run dev

## Deployment

### Deploy on Vercel
1. Fork this repository
2. Go to vercel.com → New Project
3. Import your GitHub repository  
4. In Environment Variables add:
   `VITE_GROQ_API_KEY` = *your_actual_groq_key*
5. Click Deploy
6. Done! ✅

### Other Hosting
- Build: `npm run build`
- Upload `dist/` folder to hosting

## Tech Stack
- React + Vite
- Tailwind CSS
- Groq API (llama3-8b)
- Canvas Confetti
