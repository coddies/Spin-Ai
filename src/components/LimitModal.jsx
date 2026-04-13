import React, { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import AdSlot from './AdSlot';

/**
 * LimitModal – shown when daily spin or AI limit is reached.
 * Also used for interstitial ad every 3rd spin.
 */
const LimitModal = ({ type, onClose }) => {
  const [countdown, setCountdown] = useState(3);
  const isInterstitial = type === 'interstitial';

  useEffect(() => {
    if (!isInterstitial) return;
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, isInterstitial]);

  const content = {
    spin: {
      emoji: '🎯',
      title: 'Daily Spin Limit Reached!',
      message:
        "You've used all 10 spins for today! Come back tomorrow or support us to keep SpinAI free ☕",
      gradient: 'from-violet-600 to-purple-700',
    },
    ai: {
      emoji: '✨',
      title: 'Daily AI Limit Reached!',
      message:
        "You've used all 3 AI generations today! Come back tomorrow or support us ✨",
      gradient: 'from-pink-500 to-rose-600',
    },
    interstitial: {
      emoji: '⚡',
      title: 'Quick Ad Break',
      message: '',
      gradient: 'from-orange-500 to-amber-500',
    },
  };

  const cfg = content[type] || content.spin;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={isInterstitial && countdown === 0 ? onClose : undefined} />

      {/* Modal */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-bounce-in">
        {/* Gradient header */}
        <div className={`bg-gradient-to-r ${cfg.gradient} px-6 py-6 text-center`}>
          <div className="text-5xl mb-2">{cfg.emoji}</div>
          <h2 className="text-xl font-black text-white">{cfg.title}</h2>
        </div>

        <div className="p-6">
          {isInterstitial ? (
            <>
              {/* Ad slot */}
              <div className="flex justify-center mb-4">
                {/* ADSENSE PLACEMENT - Interstitial 300x250 Rectangle */}
                <AdSlot type="rectangle" />
              </div>
              <div className="relative group">
                {countdown === 0 && (
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 120%, rgba(168,85,247,0.7) 0%, rgba(236,72,153,0.5) 50%, transparent 100%)',
                      transform: 'translateY(6px) scaleX(1.1) scaleY(0.5)',
                    }}
                  />
                )}
                <button
                  onClick={countdown === 0 ? onClose : undefined}
                  disabled={countdown > 0}
                  id="close-interstitial-btn"
                  className={`relative overflow-hidden w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                    countdown > 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'text-white hover:scale-105 hover:-translate-y-0.5 active:scale-95'
                  }`}
                  style={countdown === 0 ? {
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 25%, #ec4899 60%, #f97316 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'btnGradientShift 3s ease infinite',
                    boxShadow: '0 4px 16px rgba(124,58,237,0.4), 0 8px 28px rgba(236,72,153,0.2)',
                  } : {}}
                >
                  {countdown === 0 && (
                    <span
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{
                        background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                        animation: 'btnShimmer 2.5s ease-in-out infinite',
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {countdown > 0 ? `Close in ${countdown}s…` : '✕ Close Ad'}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-sm text-center mb-6 leading-relaxed">
                {cfg.message}
              </p>

              {/* Ko-fi button with bloom + shimmer */}
              <div className="relative group mb-3">
                <div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 50% 120%, rgba(236,72,153,0.7) 0%, rgba(249,115,22,0.5) 50%, transparent 100%)',
                    transform: 'translateY(6px) scaleX(1.1) scaleY(0.5)',
                  }}
                />
                <a
                  href="https://ko-fi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="donate-limit-btn"
                  className="relative overflow-hidden w-full flex items-center justify-center py-3.5 px-6 text-white rounded-2xl font-bold text-base text-center hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 30%, #f97316 70%, #fb923c 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'btnGradientShift 3s ease infinite',
                    boxShadow: '0 4px 16px rgba(236,72,153,0.4), 0 8px 28px rgba(249,115,22,0.2)',
                  }}
                >
                  <span
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
                      backgroundSize: '200% 100%',
                      animation: 'btnShimmer 2.5s ease-in-out infinite',
                    }}
                  />
                  <Heart size={16} className="inline mr-2 relative z-10" />
                  <span className="relative z-10">☕ Support SpinAI on Ko-fi</span>
                </a>
              </div>

              <button
                onClick={onClose}
                id="close-limit-modal-btn"
                className="btn-white w-full py-3 px-6 rounded-2xl font-semibold text-sm border border-gray-100"
              >
                <span className="btn-content">Maybe later</span>
              </button>
            </>
          )}
        </div>

        {/* Close button */}
        {(!isInterstitial || countdown === 0) && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors text-white"
            aria-label="Close"
            id="close-limit-x-btn"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default LimitModal;
