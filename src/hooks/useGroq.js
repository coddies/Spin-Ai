import { useState, useCallback } from 'react';

/**
 * useGroq – calls the secure server-side proxy at /api/groq.
 *
 * The API key is NEVER present in the browser bundle.
 * All Groq calls go through the Vercel serverless function at /api/groq.
 *
 * ⚠️  HOSTING NOTE:
 * Currently using a relative path '/api/groq' which works on Vercel
 * because the frontend and serverless function share the same domain.
 *
 * If you move the frontend to Hostinger (static hosting), change
 * API_ENDPOINT to the absolute Vercel URL:
 *   const API_ENDPOINT = 'https://spin-ai-brown.vercel.app/api/groq';
 *
 * The /api/groq function already sends CORS headers, so cross-domain
 * requests from Hostinger will work without any backend changes.
 */

// ↓ Change this to absolute URL if frontend moves to Hostinger
const API_ENDPOINT = '/api/groq';

/**
 * Hook to generate wheel items via the secure server-side Groq proxy.
 */
export const useGroq = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateItems = useCallback(async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Server error: ${response.status}`);
      }

      const items = Array.isArray(data) ? data : (data?.items || []);

      if (items.length < 2) {
        throw new Error('Invalid response from server. Please try again.');
      }

      setLoading(false);
      return items;
    } catch (err) {
      console.error('[SpinWheel AI] API proxy error:', err.message);
      setLoading(false);
      setError(err.message || 'Failed to generate items. Please try again.');
      return null;
    }
  }, []);

  return { generateItems, loading, error, setError };
};
