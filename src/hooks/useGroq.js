import { useState, useCallback } from 'react';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Fallback model chain — if one fails (decommissioned / rate-limited / error),
 * the hook automatically retries with the next model in order.
 */
const GROQ_MODELS = [
  'llama-3.1-8b-instant',      // Primary: fast, cheap, actively supported
  'llama3-70b-8192',           // Fallback 1: larger, more capable
  'mixtral-8x7b-32768',        // Fallback 2: Mixtral, different provider base
  'gemma2-9b-it',              // Fallback 3: Google Gemma via Groq
  'llama-3.3-70b-versatile',   // Fallback 4: latest Llama 3.3
];

const SYSTEM_PROMPT = `You are a wheel spinner assistant. User will give you a topic or description. Return ONLY a valid JSON array of 4 to 10 short items (maximum 3 words each). No explanation, no markdown, no extra text. Just the raw JSON array. Example: ["Item 1", "Item 2", "Item 3"]`;

/**
 * Try a single model — returns parsed items array or throws
 */
const tryModel = async (model, prompt, apiKey) => {
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
  if (!content) throw new Error('Empty response');

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
};

/**
 * Hook to call Groq API with automatic model fallback.
 * Tries each model in GROQ_MODELS order until one succeeds.
 */
export const useGroq = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeModel, setActiveModel] = useState(GROQ_MODELS[0]);

  const generateItems = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      setLoading(false);
      setError('API key not configured. Add your Groq key to the .env file.');
      return null;
    }

    let lastError = null;

    for (const model of GROQ_MODELS) {
      try {
        console.log(`[SpinAI] Trying model: ${model}`);
        const items = await tryModel(model, prompt, apiKey);
        // Success — remember which model worked
        setActiveModel(model);
        console.log(`[SpinAI] ✅ Success with model: ${model}`);
        setLoading(false);
        return items;
      } catch (err) {
        console.warn(`[SpinAI] ❌ Model ${model} failed:`, err.message);
        lastError = err;
        // Continue to next model
      }
    }

    // All models failed
    setLoading(false);
    setError(`AI failed on all models. Last error: ${lastError?.message || 'Unknown error'}`);
    return null;
  }, []);

  return { generateItems, loading, error, setError, activeModel };
};

