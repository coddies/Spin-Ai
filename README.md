# 🎡 SpinWheel AI — AI-Powered Spin Wheel & Random Picker

> **Live Site:** [spinwheelai.online](https://spinwheelai.online)

**SpinWheel AI** is a free, AI-powered spinning wheel and random picker tool. Just type any topic and AI instantly fills your wheel — no signup required, unlimited spins, 100% free.

---

## ✨ Features

### 🤖 AI Generation
- Type any topic (e.g. "Dinner Ideas", "Team Names", "Quiz Topics") and AI fills your wheel instantly
- Powered by **Groq API** with sequential multi-model fallback chain
- 10 free AI generations per day (resets every 24 hours)
- Earn extra credits by watching a rewarded ad

### 🎡 Wheel & Interaction
- Smooth physics-based spin animation with easing
- Click the wheel or the SPIN button to spin
- **Elimination Mode** — remove the winner after each spin (no repeat picks)
- Spin history — see your last 5 results with timestamps
- Copy results to clipboard

### 💾 Persistence
- Wheel items auto-saved in `localStorage` — survive page reloads
- No backend database needed

### 📢 Ads & Monetization
- Google AdSense integration (Leaderboard + Rectangle + Mobile Banner)
- Interstitial ad after 5 spins or 5 minutes of active use
- Rewarded Ad Modal to unlock extra AI credits

### 📄 Pages (SEO Crawlable)
Full standalone pages built with `react-router-dom` for Google AdSense approval:
- `/` — Main app (Home)
- `/privacy-policy` — Full Privacy Policy
- `/terms-of-service` — Full Terms of Service
- `/contact` — Contact form + social links
- `/faq` — Categorized FAQ with 20+ questions
- `/blog` — Blog index (5 articles)
- `/blog/how-to-build-ai-wheel-spinner`
- `/blog/how-to-make-your-first-ai-app`
- `/blog/generative-ai-vs-traditional-ai`
- `/blog/building-ai-apps-with-fastapi`
- `/blog/ai-video-generation-case-study`

### 🔍 SEO
- JSON-LD WebApplication schema
- Open Graph + Twitter Card meta tags
- Canonical URL, `robots.txt`, `sitemap.xml`
- Google Search Console verification
- Google AdSense `ads.txt`

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS v3 |
| Routing | react-router-dom v7 |
| Icons | lucide-react |
| Wheel | HTML5 Canvas API |
| Confetti | canvas-confetti |
| AI Provider | Groq API (multi-model fallback) |
| Backend Proxy | PHP (`public/api/groq.php`) |
| Hosting | Hostinger (Apache) |
| CI/CD | GitHub → Hostinger auto-deploy |

---

## 🚀 Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/coddies/Spin-Ai.git
cd Spin-Ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Edit `.env` and add your Groq API key:
```env
GROQ_API_KEY=gsk_your_actual_key_here
```
> ⚠️ **Never commit your `.env` file.** It's in `.gitignore`.

### 4. Run locally
```bash
npm run dev
```
App runs at `http://localhost:5173`

---

## 🌐 Deployment — Hostinger (Apache)

This project is deployed on **Hostinger** using GitHub auto-deploy integration.

### How it works:
1. `npm run build` generates the `dist/` folder
2. Hostinger's GitHub integration pulls from `main` branch and deploys `dist/`
3. `public/.htaccess` handles SPA routing so all `/privacy-policy`, `/blog` etc. URLs work correctly

### `.htaccess` — SPA Routing (already configured)
```apache
# Block access to .env files
<Files ~ "^\.env">
    Order allow,deny
    Deny from all
</Files>

# SPA Routing Support
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

### Environment variable on Hostinger:
Set `GROQ_API_KEY` in Hostinger's **Advanced → PHP Configuration → Environment Variables** panel.

---

## 🤖 AI Model Fallback Chain

The PHP proxy (`public/api/groq.php`) tries models in this order:

```php
$models = [
    'openai/gpt-oss-20b',    // Primary — fast, available
    'qwen/qwen3.6-27b',      // Fallback 1
    'openai/gpt-oss-120b',   // Fallback 2
    'allam-2-7b',             // Fallback 3
    'llama-3.3-70b-versatile',// Fallback 4
    'llama-3.1-8b-instant',  // Fallback 5
    ...
];
```
If all models fail → user sees a friendly error, never a technical message.

---

## 📁 Project Structure

```
SpinAI/
├── public/
│   ├── .htaccess              # Apache SPA routing + security rules
│   ├── ads.txt                # Google AdSense publisher verification
│   ├── robots.txt             # Search engine crawl rules
│   ├── sitemap.xml            # XML sitemap for SEO
│   ├── og-image.png           # Open Graph preview image
│   ├── favicon.svg            # Favicon
│   ├── google021b30747de4e862.html  # Google Search Console verification
│   └── api/
│       └── groq.php           # PHP proxy for Groq API (keeps key secure)
├── src/
│   ├── components/
│   │   ├── Wheel.jsx          # Canvas-based spinning wheel
│   │   ├── AIPanel.jsx        # AI prompt input + generation UI
│   │   ├── ItemsList.jsx      # Manual item management
│   │   ├── WinnerModal.jsx    # Winner celebration popup
│   │   ├── InfoModal.jsx      # About/Privacy/Terms modals
│   │   ├── Header.jsx         # Top navigation bar
│   │   ├── SEOSection.jsx     # FAQ + How-to section (homepage)
│   │   ├── AdSlot.jsx         # Google AdSense ad unit wrapper
│   │   ├── InterstitialAd.jsx # Timed interstitial ad overlay
│   │   └── RewardedAdModal.jsx# Rewarded ad for extra AI credits
│   ├── pages/
│   │   ├── PrivacyPolicyPage.jsx
│   │   ├── TermsOfServicePage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── FAQPage.jsx
│   │   ├── BlogPage.jsx
│   │   └── blog/
│   │       ├── BlogPost1.jsx  # How to build AI wheel spinner
│   │       ├── BlogPost2.jsx  # How to make your first AI app
│   │       ├── BlogPost3.jsx  # Generative AI vs Traditional AI
│   │       ├── BlogPost4.jsx  # Building AI apps with FastAPI
│   │       └── BlogPost5.jsx  # AI Video Generation case study
│   ├── hooks/
│   │   ├── useGroq.js         # AI generation hook (calls groq.php)
│   │   └── useAIUsage.js      # Daily usage limit + reward tracking
│   ├── utils/
│   │   ├── confetti.js        # Winner confetti animation
│   │   ├── colors.js          # Wheel segment color palette
│   │   └── audio.js           # Spin tick + winner sound effects
│   ├── App.jsx                # Main app + routing shell + footer
│   ├── main.jsx               # Entry point with react-router-dom BrowserRouter
│   └── index.css              # Global styles + Tailwind + animations
├── index.html                 # HTML shell with SEO meta tags + AdSense
├── vite.config.js             # Vite build configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── .env.example               # Environment variable template
├── .gitignore                 # Git ignore rules
└── package.json               # Dependencies and scripts
```

---

## 🔒 Security

- **API key is server-side only** — stored in Hostinger environment variables, accessed only by `groq.php`
- **`.env` is gitignored** — never pushed to GitHub
- **`.htaccess` blocks `.env` files** — even if accidentally uploaded, they won't be accessible
- **Frontend never sees the API key** — all AI requests go through the PHP proxy

---

## 📧 Contact

- **Email:** [spinwheelai@spinwheelai.online](mailto:spinwheelai@spinwheelai.online)
- **Website:** [spinwheelai.online](https://spinwheelai.online)
- **GitHub:** [github.com/coddies](https://github.com/coddies)
- **LinkedIn:** [Muhammad Burhan](https://www.linkedin.com/in/muhammad-burhan-73a81b27b/)

---

## 📄 License

This project is proprietary. All rights reserved © 2026 SpinWheel AI / Muhammad Burhan.
