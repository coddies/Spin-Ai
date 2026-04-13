# 🎡 SpinAI - AI Powered Wheel Spinner

Spin smarter with AI! Enter any topic and AI will fill 
the wheel automatically.

## Features
- AI-powered wheel generation (Groq API)
- Colorful animated spinner
- Daily limits (10 spins, 3 AI uses)
- Ad monetization ready
- Mobile responsive

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
- Build: npm run build
- Upload dist/ folder to hosting

## Tech Stack
- React + Vite
- Tailwind CSS
- Groq API (llama3-8b)
- Canvas Confetti
