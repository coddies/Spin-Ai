import React, { useEffect } from 'react';
import { X, Share2, RotateCcw, Copy } from 'lucide-react';
import { getSegmentColor } from '../utils/colors';

/**
 * WinnerModal – displayed after wheel stops spinning.
 * Shows winner name in gradient, confetti plays in background.
 * Features: Spin Again, Share Result, Copy to clipboard.
 */
const WinnerModal = ({ winner, winnerIndex, onClose, onSpinAgain }) => {
  const [copied, setCopied] = React.useState(false);
  const color = getSegmentColor(winnerIndex ?? 0);

  useEffect(() => {
    // Update page title
    if (winner) {
      document.title = `🎉 ${winner} wins! – SpinAI`;
    }
    return () => {
      document.title = 'SpinAI - Spin Smarter with AI 🎡';
    };
  }, [winner]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`🎡 SpinAI picked: ${winner}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    const text = `🎡 SpinAI just picked "${winner}"! Try it at SpinAI`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'SpinAI Result', text });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  };

  if (!winner) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Winner announcement"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-bounce-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-white absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center border border-gray-100/50 shadow-sm"
          aria-label="Close modal"
          id="close-winner-modal"
        >
          <span className="btn-content">
            <X size={16} />
          </span>
        </button>

        {/* Trophy */}
        <div className="text-6xl mb-4 animate-float">🏆</div>

        {/* Winner Header */}
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Winner is…
        </p>

        {/* Winner Name */}
        <div
          className="text-4xl font-black mb-6 leading-tight px-2 break-words"
          style={{
            background: `linear-gradient(135deg, ${color}, #ec4899)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {winner}
        </div>

        {/* Winner Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm mb-6 shadow-lg"
          style={{ backgroundColor: color }}
        >
          🎉 Congratulations!
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {/* Spin Again - bloom + shimmer */}
          <div className="relative group">
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 120%, rgba(168,85,247,0.7) 0%, rgba(236,72,153,0.5) 40%, rgba(249,115,22,0.25) 70%, transparent 100%)',
                transform: 'translateY(6px) scaleX(1.1) scaleY(0.5)',
              }}
            />
            <button
              onClick={onSpinAgain}
              id="spin-again-btn"
              className="relative overflow-hidden w-full py-3.5 px-6 text-white rounded-2xl font-bold text-base hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 25%, #ec4899 60%, #f97316 100%)',
                backgroundSize: '200% 200%',
                animation: 'btnGradientShift 3s ease infinite',
                boxShadow: '0 4px 20px rgba(124,58,237,0.45), 0 8px 32px rgba(236,72,153,0.25)',
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
              <RotateCcw size={18} className="relative z-10" />
              <span className="relative z-10">Spin Again</span>
            </button>
          </div>

          <div className="flex gap-2">
            {/* Share button - bloom + shimmer */}
            <div className="relative group flex-1">
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 120%, rgba(37,99,235,0.7) 0%, rgba(99,102,241,0.5) 50%, rgba(168,85,247,0.3) 80%, transparent 100%)',
                  transform: 'translateY(6px) scaleX(1.1) scaleY(0.5)',
                }}
              />
              <button
                onClick={handleShare}
                id="share-result-btn"
                className="relative overflow-hidden w-full py-3 px-4 text-white rounded-2xl font-bold text-sm hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 35%, #7c3aed 70%, #a855f7 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'btnGradientShift 3s ease infinite',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.4), 0 8px 24px rgba(79,70,229,0.25)',
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
                <Share2 size={15} className="relative z-10" />
                <span className="relative z-10">Share</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              id="copy-result-btn"
              className={`flex-1 py-3 px-4 border rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${
                copied 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-transparent text-white shadow-[0_10px_20px_rgba(34,197,94,0.3)] hover:scale-105 active:scale-95 transition-all duration-300' 
                  : 'btn-white border-gray-200'
              }`}
            >
              <span className="btn-content">
                <Copy size={15} />
                {copied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
