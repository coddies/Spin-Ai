import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const BlogPost1 = () => {
  useEffect(() => {
    document.title = 'How to Build an AI-Powered Wheel Spinner App (Complete 2026 Guide) - SpinWheel AI Blog';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Learn how to build a stunning AI-powered spinning wheel app using React, Vite, Tailwind CSS, and the Groq API. Step-by-step tutorial with full code examples.');
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
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-100 text-violet-700">AI Tutorials</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
          How to Build an AI-Powered Wheel Spinner App (Complete 2026 Guide)
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
          <span className="flex items-center gap-1"><Clock size={14} /> 8 min read</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> August 2026</span>
          <span>By Muhammad Burhan</span>
        </div>

        <article className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">

          <p className="text-lg font-medium text-gray-800">
            Spin wheel apps have been a classic go-to for teachers, game hosts, decision-makers, and content creators for years. But what if your spin wheel could think? What if instead of manually typing in "Pizza, Sushi, Burger, Tacos," you could just type <em>"dinner ideas"</em> and let AI fill in the rest?
          </p>

          <p>
            That's exactly what I built with <strong>SpinWheel AI</strong> — and in this guide, I'll show you how to build your own version from scratch. By the end, you'll have a fully functional, AI-powered spinning wheel web app deployed and live on the internet.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Why AI Integration Changes Everything</h2>
          <p>
            Traditional spin wheel apps are simple: you type your items, you spin. But they put all the creative burden on the user. With AI integration, the user only needs to express <em>intent</em> — the AI does the creative heavy lifting. This transforms the UX from "manual input tool" to "intelligent assistant."
          </p>
          <p>
            For example, instead of thinking about and typing 8 team-building activities, a user can simply type "team building activities for remote workers" and get a perfectly formatted list in under two seconds.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Tech Stack Overview</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Frontend Framework:</strong> React 19 + Vite 6</li>
            <li><strong>Styling:</strong> Tailwind CSS v3</li>
            <li><strong>Wheel Rendering:</strong> HTML5 Canvas API</li>
            <li><strong>AI Provider:</strong> Groq API (fast LLM inference)</li>
            <li><strong>Backend Proxy:</strong> PHP (for Hostinger) or Node.js serverless</li>
            <li><strong>Deployment:</strong> Hostinger / Vercel</li>
            <li><strong>Extras:</strong> canvas-confetti, lucide-react, react-router-dom</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 1: Project Setup</h2>
          <p>Start by scaffolding a new Vite + React project:</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`npm create vite@latest spin-wheel-ai -- --template react
cd spin-wheel-ai
npm install
npm install tailwindcss @tailwindcss/typography lucide-react canvas-confetti react-router-dom
npx tailwindcss init -p`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 2: Building the Wheel Component</h2>
          <p>
            The wheel is rendered using the HTML5 Canvas API. The key challenge is calculating segment angles and drawing them with proper colors and text labels. Here's the core drawing logic:
          </p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`const drawWheel = (ctx, items, rotation) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = Math.min(centerX, centerY) - 10;
  const arc = (2 * Math.PI) / items.length;

  items.forEach((item, i) => {
    const angle = rotation + i * arc;
    // Draw segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, angle, angle + arc);
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    // Draw label
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Poppins';
    ctx.fillText(item, radius / 2, 0);
    ctx.restore();
  });
};`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 3: The Spin Animation</h2>
          <p>
            The spin animation uses a physics-based easing function to simulate deceleration. The wheel spins with a random speed and slows to a stop at a random angle:
          </p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`const spinWheel = () => {
  const totalRotation = Math.random() * 10 + 5; // 5-15 full rotations
  const duration = 4000 + Math.random() * 2000; // 4-6 seconds
  const startTime = performance.now();
  const startAngle = currentAngle;

  const animate = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    currentAngle = startAngle + totalRotation * 2 * Math.PI * eased;
    drawWheel(ctx, items, currentAngle);
    if (progress < 1) requestAnimationFrame(animate);
    else onSpinComplete(currentAngle);
  };
  requestAnimationFrame(animate);
};`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 4: Integrating the Groq API</h2>
          <p>
            Never expose your API key on the frontend. Always use a backend proxy. Here's a PHP proxy for Hostinger environments:
          </p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$apiKey = getenv('GROQ_API_KEY');
$body = json_decode(file_get_contents('php://input'), true);

$models = ['openai/gpt-oss-20b', 'qwen/qwen3.6-27b'];

foreach ($models as $model) {
  $payload = json_encode([
    'model' => $model,
    'messages' => [
      ['role' => 'system', 'content' => 'Return only a JSON array of 4-10 short items.'],
      ['role' => 'user', 'content' => $body['topic']]
    ]
  ]);
  
  $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => [
      'Authorization: Bearer ' . $apiKey,
      'Content-Type: application/json'
    ]
  ]);
  $response = json_decode(curl_exec($ch), true);
  curl_close($ch);
  
  if (!isset($response['error'])) {
    echo json_encode(['items' => json_decode($response['choices'][0]['message']['content'])]);
    exit;
  }
}
http_response_code(502);
echo json_encode(['error' => 'AI temporarily unavailable.']);`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 5: The AI Panel UI</h2>
          <p>
            The AI panel is a simple text input that sends the user's topic to your backend and receives the generated items. On success, it calls a callback to update the wheel:
          </p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`const handleGenerate = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/groq.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: inputValue })
    });
    const data = await res.json();
    if (data.items) onItemsGenerated(data.items);
    else setError('AI unavailable, try again.');
  } catch {
    setError('AI unavailable, try again.');
  } finally {
    setLoading(false);
  }
};`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 6: Winner Detection</h2>
          <p>After the spin stops, calculate which segment the pointer is pointing at based on the final rotation angle:</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`const getWinner = (finalAngle, items) => {
  const arc = (2 * Math.PI) / items.length;
  // Normalize angle so 0 is at the top (pointer position)
  const normalized = ((2 * Math.PI) - (finalAngle % (2 * Math.PI))) % (2 * Math.PI);
  const winnerIndex = Math.floor(normalized / arc) % items.length;
  return { item: items[winnerIndex], index: winnerIndex };
};`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Step 7: Deployment</h2>
          <p>For Hostinger deployment:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Build the project: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">npm run build</code></li>
            <li>Upload the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">dist/</code> folder contents and <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">public/api/groq.php</code> to your Hostinger public_html</li>
            <li>Set your <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">GROQ_API_KEY</code> in Hostinger's environment variables panel</li>
            <li>Add an <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.htaccess</code> to handle SPA routing</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Conclusion</h2>
          <p>
            Building an AI-powered spin wheel app is a fantastic project that combines frontend creativity with modern AI integration. The key insights from building SpinWheel AI:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Always proxy API keys through a backend — never expose them on the frontend</li>
            <li>Use a model fallback array so if one AI model fails, others take over automatically</li>
            <li>localStorage is perfect for storing wheel state without needing a backend database</li>
            <li>Canvas API gives you full control over the wheel's visual appearance and animations</li>
          </ul>
          <p>
            You can see the live result at <a href="https://spinwheelai.online" className="text-violet-600 hover:underline">spinwheelai.online</a>. 
            Happy building! 🎡
          </p>
        </article>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-6 border border-violet-100">
          <p className="font-bold text-gray-900 mb-2">Try the live demo!</p>
          <p className="text-sm text-gray-600 mb-4">Experience the AI wheel spinner we built in this tutorial.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm">
            🎡 Open SpinWheel AI
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
          <Link to="/blog" className="hover:text-violet-600">Blog</Link>{' | '}
          <Link to="/contact" className="hover:text-violet-600">Contact</Link>
        </p>
      </footer>
    </div>
  );
};

export default BlogPost1;
