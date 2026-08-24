import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const BlogPost2 = () => {
  useEffect(() => {
    document.title = "How to Make Your First AI App: Beginner's Guide - SpinWheel AI Blog";
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', "Never built an AI app before? This complete beginner's guide walks you through making your first AI-powered application step by step, no ML degree required.");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 font-poppins">
      <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/blog" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm">
            <ArrowLeft size={16} /> Blog
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg">🎡</span>
            <span className="font-black bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent text-sm">SpinWheel AI</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
          How to Make Your First AI App: Beginner's Guide
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
          <span className="flex items-center gap-1"><Clock size={14} /> 6 min read</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> August 2026</span>
          <span>By Muhammad Burhan</span>
        </div>

        <article className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg font-medium text-gray-800">
            The AI revolution is here — and you don't need a PhD in machine learning to be part of it. In 2026, building AI-powered apps is more accessible than ever, thanks to powerful APIs that let you tap into state-of-the-art AI models with just a few lines of code.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">What is AI App Development?</h2>
          <p>
            AI app development means building applications that use artificial intelligence to provide intelligent features. This could be a chatbot, an image generator, a content summarizer, or — like SpinWheel AI — an AI-powered decision tool. The key insight: <strong>you don't build the AI yourself.</strong> You use APIs that give you access to pre-trained models built by companies like OpenAI, Anthropic, Google, and Groq.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Prerequisites</h2>
          <p>You need surprisingly little to get started:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Basic understanding of any programming language (JavaScript is recommended)</li>
            <li>Familiarity with how HTTP requests work (fetch/axios)</li>
            <li>A free API key from an AI provider (Groq, OpenAI, etc.)</li>
            <li>Node.js installed on your computer</li>
          </ul>
          <p>That's it. No machine learning knowledge required.</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 1: Choose Your First AI Project</h2>
          <p>The best first AI app is one that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Solves a real problem you or someone you know has</li>
            <li>Uses text input/output (easiest to start with)</li>
            <li>Is small enough to complete in a weekend</li>
          </ul>
          <p>Great beginner project ideas:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>🤖 A chatbot that answers questions about a topic you love</li>
            <li>✍️ A writing assistant that improves your sentences</li>
            <li>📋 A to-do list generator that breaks big tasks into steps</li>
            <li>🎡 An AI wheel spinner that generates options from a topic</li>
            <li>📧 An email subject line generator</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 2: Understanding APIs vs Building Models</h2>
          <p>
            There are two ways to add AI to your app:
          </p>
          <p><strong>Option A: Use an API (Recommended for beginners)</strong> — Companies like OpenAI and Groq host powerful AI models and give you API access. You send a request with your input, they process it on their servers, and return the output. This is fast, easy, and costs nothing to start.</p>
          <p><strong>Option B: Train your own model</strong> — This requires large datasets, GPU hardware, and deep ML expertise. Definitely not for beginners. Skip this for now.</p>
          <p><em>Verdict: Always start with an API. You can explore model training years later.</em></p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 3: Build a Simple AI Chatbot</h2>
          <p>Let's build a minimal AI chatbot in JavaScript using the Groq API. First, get a free API key from <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">console.groq.com</a>.</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`// Simple AI Chatbot with Groq API
async function askAI(userMessage) {
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7
      })
    }
  );
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Example usage
const answer = await askAI('What are 5 healthy breakfast ideas?');
console.log(answer);`}</code>
          </pre>
          <p>That's a working AI chatbot in about 30 lines of code!</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 4: Add a Simple UI</h2>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`<!-- Simple HTML UI -->
<div id="chat-app">
  <input id="user-input" type="text" placeholder="Ask anything..." />
  <button onclick="handleSend()">Ask AI</button>
  <div id="response-box"></div>
</div>

<script>
async function handleSend() {
  const input = document.getElementById('user-input').value;
  document.getElementById('response-box').textContent = 'Thinking...';
  const reply = await askAI(input);
  document.getElementById('response-box').textContent = reply;
}
</script>`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Common Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Exposing API keys on the frontend</strong> — Always use a backend or environment variables. Never put API keys in JavaScript that runs in the browser.</li>
            <li><strong>Not handling errors</strong> — AI APIs can fail. Always add try/catch and show friendly error messages.</li>
            <li><strong>Trying to build too much at once</strong> — Start with the simplest possible version. Add features gradually.</li>
            <li><strong>Ignoring rate limits</strong> — Most free tiers have limits. Build in fallback logic early.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Resources for Learning More</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><a href="https://console.groq.com/docs" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Groq API Documentation</a></li>
            <li><a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">OpenAI API Documentation</a></li>
            <li><a href="https://spinwheelai.online" className="text-violet-600 hover:underline">SpinWheel AI — a real AI app you can study</a></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Next Steps</h2>
          <p>Once you've built your first AI app, here's what to tackle next:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Add a proper backend (Node.js, FastAPI, or PHP) to protect your API keys</li>
            <li>Learn React or Vue to build more interactive UIs</li>
            <li>Deploy your app online using Vercel, Netlify, or Hostinger</li>
            <li>Explore more AI capabilities: image generation, speech-to-text, embeddings</li>
          </ol>

          <p className="mt-6">
            The most important thing is to just start. Build something, ship it, learn from it. The AI developer community is growing fast — and there's never been a better time to join it. 🚀
          </p>
        </article>

        <div className="mt-12 bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-6 border border-violet-100">
          <p className="font-bold text-gray-900 mb-2">See a live AI app example!</p>
          <p className="text-sm text-gray-600 mb-4">SpinWheel AI uses the exact same techniques from this guide.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm">
            🎡 Try SpinWheel AI Free
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link to="/blog" className="flex items-center gap-2 text-violet-600 hover:underline font-medium text-sm">
            <ArrowLeft size={14} /> Back to all articles
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpinWheel AI. |{' '}
          <Link to="/" className="hover:text-violet-600">Home</Link>{' | '}
          <Link to="/blog" className="hover:text-violet-600">Blog</Link>
        </p>
      </footer>
    </div>
  );
};

export default BlogPost2;
