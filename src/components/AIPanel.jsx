import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, AlertCircle, X } from 'lucide-react';
import { useGroq } from '../hooks/useGroq';

/**
 * AIPanel – Groq-powered item generator with gradient border,
 * loading state, error toasts, and limit tracking.
 */
const AIPanel = ({ onItemsGenerated, canUseAI, aiLeft, onLimitReached }) => {
  const [prompt, setPrompt] = useState('');
  const { generateItems, loading, error, setError } = useGroq();
  const [successMsg, setSuccessMsg] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('spinai_ai_onboarded')) {
      // Small delay so it pops in beautifully
      const t = setTimeout(() => setShowTooltip(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const dismissTooltip = () => {
    localStorage.setItem('spinai_ai_onboarded', 'true');
    setShowTooltip(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    if (!canUseAI) {
      onLimitReached('ai');
      return;
    }

    setSuccessMsg('');
    setError(null);

    const items = await generateItems(prompt.trim());

    if (items && items.length > 0) {
      onItemsGenerated(items);
      setSuccessMsg(`✅ Generated ${items.length} items!`);
      setPrompt('');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const examplePrompts = [
    '5 random countries',
    'Cricket team names',
    'Pizza toppings',
    'Fun punishments',
    'Netflix genres',
  ];

  return (
    <div
      className="relative rounded-2xl p-[2px] shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #7c3aed, #ec4899, #f97316)',
      }}
      id="ai-panel"
    >
      {/* Onboarding Tooltip Pop-up */}
      {showTooltip && (
        <div className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-50 w-max animate-bounce-in">
          <div className="bg-gray-900 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3">
            <span>✨ Generate with AI here!</span>
            <button 
              onClick={dismissTooltip}
              className="w-5 h-5 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors"
            >
              <X size={12} />
            </button>
          </div>
          {/* Tooltip triangle arrow down */}
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900 absolute top-full left-1/2 -translate-x-1/2" />
        </div>
      )}

      <div className="bg-white/95 backdrop-blur-md rounded-[14px] p-5">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center shadow-md">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-base flex items-center gap-1.5">
              AI Item Generator
              <span className="text-xs bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700 px-2 py-0.5 rounded-full border border-violet-200 font-semibold">
                ✨ {aiLeft} left
              </span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Let AI fill your wheel instantly</p>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="relative mb-3">
          <textarea
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="e.g. 5 random countries, cricket teams, pizza toppings, punishments for a game"
            rows={3}
            id="ai-prompt-input"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all resize-none"
            disabled={loading}
          />
        </div>

        {/* Example prompts */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {examplePrompts.map((ex) => (
            <button
              key={ex}
              onClick={() => setPrompt(ex)}
              disabled={loading}
              className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-violet-50 text-gray-600 hover:text-violet-700 rounded-full border border-gray-200 hover:border-violet-300 transition-all font-medium"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Generate Button */}
        <div className="relative group">
          {/* Light bloom behind */}
          <div
            className={`absolute inset-0 rounded-xl blur-xl transition-opacity duration-300 pointer-events-none ${
              loading || !prompt.trim() || !canUseAI ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 50% 120%, rgba(168,85,247,0.7) 0%, rgba(236,72,153,0.5) 40%, rgba(249,115,22,0.25) 70%, transparent 100%)',
              transform: 'translateY(6px) scaleX(1.1) scaleY(0.55)',
            }}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || !canUseAI}
            id="ai-generate-btn"
            className={`
              relative overflow-hidden w-full py-3 px-6 rounded-xl font-bold text-white text-sm
              shadow-md transition-all duration-300
              ${
                loading || !prompt.trim() || !canUseAI
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0'
              }
            `}
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 25%, #ec4899 60%, #f97316 100%)',
              backgroundSize: '200% 200%',
              animation: loading ? 'none' : 'btnGradientShift 3s ease infinite',
              boxShadow: loading || !prompt.trim() || !canUseAI
                ? 'none'
                : '0 4px 16px rgba(124,58,237,0.4), 0 8px 28px rgba(236,72,153,0.2)',
            }}
          >
            {/* Shimmer sweep */}
            {!(loading || !prompt.trim() || !canUseAI) && (
              <span
                className="absolute inset-0 pointer-events-none rounded-xl"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'btnShimmer 2.5s ease-in-out infinite',
                }}
              />
            )}
            {loading ? (
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                AI is thinking…
              </span>
            ) : (
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Sparkles size={16} />
                ✨ Generate with AI
              </span>
            )}
          </button>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="mt-3 text-sm text-emerald-600 font-semibold bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 animate-fade-in">
            {successMsg}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mt-3 flex items-start gap-2 text-sm text-rose-600 font-medium bg-rose-50 border border-rose-200 rounded-xl px-3 py-2 animate-fade-in">
            <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Limit warning */}
        {!canUseAI && (
          <div className="mt-3 text-sm text-amber-600 font-semibold bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-center">
            🚫 Daily AI limit reached. Come back tomorrow!
          </div>
        )}

        {/* Info text - model name hidden from user */}
        <p className="mt-3 text-xs text-gray-400 text-center">
          ✨ AI powered · {aiLeft}/3 uses today
        </p>
      </div>
    </div>
  );
};

export default AIPanel;
