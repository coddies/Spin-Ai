/**
 * Vercel Serverless Function: /api/groq
 *
 * Acts as a secure server-side proxy for the Groq API.
 * The GROQ_API_KEY is stored in Vercel environment variables and
 * is NEVER exposed to the browser bundle.
 *
 * Accepts: POST { prompt: string }
 * Returns: { items: string[] }
 *
 * CORS headers are included so this endpoint also works when the
 * frontend is hosted on a different domain (e.g. Hostinger).
 * If you move the frontend to Hostinger, update useGroq.js to use
 * the absolute URL: https://spinwheelai.online/api/groq
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are a wheel spinner assistant. User will give you a topic or description. Return ONLY a valid JSON array of 4 to 10 short items (maximum 3 words each). No explanation, no markdown, no extra text. Just the raw JSON array. Example: ["Item 1", "Item 2", "Item 3"]`;

/**
 * Fallback model chain — tries models in order until one succeeds.
 */
const GROQ_MODELS = [
  'llama-3.1-8b-instant',     // Primary Active: Meta Llama 3.1 8B
  'llama-3.3-70b-versatile',  // Fallback 1: Meta Llama 3.3 70B
  'llama-3.2-3b-preview',     // Fallback 2: Meta Llama 3.2 3B
  'llama-3.2-1b-preview',     // Fallback 3: Meta Llama 3.2 1B
];

/**
 * Attempt a single Groq model and return parsed items array or throw.
 */
async function tryModel(model, prompt, apiKey) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 256,
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const msg = errData?.error?.message || `HTTP ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty response from model');

  // Strip accidental markdown fences
  const cleaned = content.replace(/```json?/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed)) throw new Error('Response is not an array');

  const filtered = parsed
    .filter((item) => typeof item === 'string' && item.trim().length > 0)
    .map((item) => item.trim().split(/\s+/).slice(0, 3).join(' '))
    .slice(0, 10);

  if (filtered.length < 2) throw new Error('Too few items returned');

  return filtered;
}

/**
 * CORS headers — allow requests from any origin so the frontend
 * works from Vercel, Hostinger, or localhost during development.
 */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * Main handler for Vercel serverless function.
 */
export default async function handler(req, res) {
  // Handle CORS preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    res.writeHead(405, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
    return;
  }

  // Read API key from server-side environment (NEVER exposed to browser)
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.writeHead(500, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Server configuration error: GROQ_API_KEY not set.' }));
    return;
  }

  // Parse request body
  let prompt;
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    prompt = body?.prompt;
  } catch {
    res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Invalid JSON body.' }));
    return;
  }

  if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
    res.writeHead(400, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Missing or empty "prompt" field in request body.' }));
    return;
  }

  // Try each model in order
  let lastError = null;
  for (const model of GROQ_MODELS) {
    try {
      console.log(`[SpinWheel AI/api] Trying model: ${model}`);
      const items = await tryModel(model, prompt.trim(), apiKey);
      console.log(`[SpinWheel AI/api] ✅ Success with model: ${model}`);
      res.writeHead(200, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify(items));
      return;
    } catch (err) {
      console.warn(`[SpinWheel AI/api] ❌ Model ${model} failed: ${err.message}`);
      lastError = err;
    }
  }

  // All models failed
  res.writeHead(502, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      error: `AI failed on all models. Last error: ${lastError?.message || 'Unknown error'}`,
    })
  );
}
