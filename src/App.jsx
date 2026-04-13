import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Wheel from './components/Wheel';
import ItemsList from './components/ItemsList';
import AIPanel from './components/AIPanel';
import WinnerModal from './components/WinnerModal';
import LimitModal from './components/LimitModal';
import InfoModal from './components/InfoModal';
import AdSlot from './components/AdSlot';
import { useSpinLimit } from './hooks/useSpinLimit';
import { fireWinnerConfetti } from './utils/confetti';
import { History, Clock, Copy, Heart, ChevronRight } from 'lucide-react';

const DEFAULT_ITEMS = [
  'Pizza 🍕',
  'Sushi 🍣',
  'Burger 🍔',
  'Tacos 🌮',
  'Pasta 🍝',
  'Ramen 🍜',
];

/**
 * Main App component – orchestrates all SpinAI functionality
 */
function App() {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winnerIndex, setWinnerIndex] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [limitModal, setLimitModal] = useState(null); // 'spin' | 'ai' | 'interstitial' | null
  const [infoModalOpen, setInfoModalOpen] = useState(null); // 'about' | 'privacy' | 'contact' | null
  const [history, setHistory] = useState([]);
  const [spinCount, setSpinCount] = useState(0);

  const {
    spinsLeft, aiLeft, canSpin, canUseAI,
    incrementSpins, incrementAI, claimReward, SPIN_LIMIT, AI_LIMIT,
  } = useSpinLimit();

  // Dynamically update document title for SEO
  useEffect(() => {
    if (winner && showWinnerModal) {
      document.title = `🎉 ${winner} - SpinAI`;
    } else {
      document.title = "SpinAI - AI Powered Wheel Spinner | Free Online Tool";
    }
  }, [winner, showWinnerModal]);

  /**
   * Called by Wheel before spinning – gate by limits.
   * Returns true if spin is allowed, false otherwise.
   */
  const handleSpinStart = useCallback(() => {
    if (!canSpin) {
      setLimitModal('spin');
      return false;
    }
    incrementSpins();
    setSpinCount((c) => c + 1);
    return true;
  }, [canSpin, incrementSpins]);

  /**
   * Called by Wheel when spin animation ends and winner determined
   */
  const handleResult = useCallback(
    (winnerName, idx) => {
      setWinner(winnerName);
      setWinnerIndex(idx);
      setShowWinnerModal(true);
      fireWinnerConfetti();

      // Add to history
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setHistory((prev) => [{ name: winnerName, time: timestamp, color: idx }, ...prev].slice(0, 5));

      // Show interstitial ad every 3rd spin
      setSpinCount((c) => {
        if (c > 0 && c % 3 === 0) {
          setTimeout(() => {
            setShowWinnerModal(false);
            setLimitModal('interstitial');
          }, 4500);
        }
        return c;
      });
    },
    []
  );

  /**
   * Handle "Spin Again" from winner modal
   */
  const handleSpinAgain = () => {
    setShowWinnerModal(false);
    setWinner(null);
    // User can click spin button manually; no auto-trigger needed
  };

  /**
   * AI items generated – update wheel items
   */
  const handleAIItemsGenerated = useCallback(
    (newItems) => {
      incrementAI();
      setItems(newItems);
    },
    [incrementAI]
  );

  const handleAILimitReached = () => setLimitModal('ai');

  /**
   * Copy history item to clipboard
   */
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(`🎡 SpinAI picked: ${text}`);
    } catch (e) {
      /* ignore */
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 font-poppins">
      {/* Header */}
      <Header
        spinsLeft={spinsLeft}
        aiLeft={aiLeft}
        SPIN_LIMIT={SPIN_LIMIT}
        AI_LIMIT={AI_LIMIT}
      />

      {/* Top Ad Banner */}
      <div className="w-full bg-white border-b border-gray-100 py-2 flex justify-center px-4">
        {/* ADSENSE PLACEMENT - Leaderboard 728x90 (desktop) / Mobile Banner 320x50 */}
        <div className="hidden md:block">
          <AdSlot type="leaderboard" />
        </div>
        <div className="md:hidden">
          <AdSlot type="mobile-banner" />
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center py-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
          <span className="bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            AI-Powered
          </span>{' '}
          Wheel Spinner
        </h1>
        <h2 className="text-gray-500 text-base font-normal">
          Type any topic — AI fills your wheel instantly
        </h2>
      </div>

      {/* Main 3-column layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: Items + AI */}
          <div className="flex flex-col gap-5 lg:order-1">
            <ItemsList items={items} setItems={setItems} />
            <AIPanel
              onItemsGenerated={handleAIItemsGenerated}
              canUseAI={canUseAI}
              aiLeft={aiLeft}
              onLimitReached={handleAILimitReached}
            />
          </div>

          {/* Center: Wheel */}
          <div className="flex flex-col items-center gap-6 lg:order-2">
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-xl w-full flex flex-col items-center">
              <Wheel
                items={items}
                onResult={handleResult}
                isSpinning={isSpinning}
                setIsSpinning={setIsSpinning}
                onSpinStart={handleSpinStart}
              />
            </div>

            {/* Spin limit info */}
            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
              <span>🎯 {spinsLeft} spin{spinsLeft !== 1 ? 's' : ''} remaining today</span>
              <span className="text-gray-300">|</span>
              <span>✨ {aiLeft} AI use{aiLeft !== 1 ? 's' : ''} left</span>
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="w-full bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-lg" id="history">
                <div className="flex items-center gap-2 mb-3">
                  <History size={18} className="text-violet-600" />
                  <h3 className="font-bold text-gray-800 text-base">Recent Results</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {history.map((entry, i) => (
                    <div
                      key={`${entry.name}-${entry.time}-${i}`}
                      className="flex items-center justify-between bg-gray-50 hover:bg-violet-50 rounded-xl px-3 py-2.5 transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: ['#7c3aed','#a855f7','#ec4899','#f43f5e','#ef4444','#f97316','#eab308','#06b6d4'][entry.color % 8] }}
                        />
                        <span className="text-sm font-semibold text-gray-800 truncate max-w-[140px]">
                          {entry.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={11} />
                          {entry.time}
                        </span>
                        <button
                          onClick={() => copyToClipboard(entry.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-violet-100 text-violet-500"
                          aria-label="Copy result"
                        >
                          <Copy size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Ad sidebar + tips */}
          <div className="flex flex-col gap-5 lg:order-3">
            {/* ADSENSE PLACEMENT - Right Sidebar 300x250 Rectangle */}
            <div className="flex justify-center">
              <AdSlot type="rectangle" />
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-200 rounded-2xl p-5">
              <h3 className="font-bold text-violet-800 mb-3 flex items-center gap-2">
                💡 Tips
              </h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  'Add 4-12 items for best results',
                  'Use AI to generate creative lists',
                  'Click the wheel or the SPIN button',
                  'Shuffle for randomness each time',
                  'Share results with friends!',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-violet-700">
                    <ChevronRight size={14} className="mt-0.5 flex-shrink-0 text-pink-500" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-md">
              <h3 className="font-bold text-gray-800 mb-3">🎯 How it works</h3>
              {[
                { step: '1', text: 'Add your items to the wheel' },
                { step: '2', text: 'Or use AI to generate a list' },
                { step: '3', text: 'Hit SPIN and let fate decide!' },
                { step: '4', text: 'Share your result with friends' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-3 mb-2.5">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {step}
                  </span>
                  <span className="text-sm text-gray-600">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎡</span>
              <span className="font-black bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                SpinAI
              </span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {[
                { label: 'About', type: 'about' },
                { label: 'Privacy Policy', type: 'privacy' },
                { label: 'Contact', type: 'contact' },
              ].map(({ label, type }) => (
                <button
                  key={label}
                  onClick={() => setInfoModalOpen(type)}
                  className="text-sm text-gray-500 hover:text-violet-600 transition-colors font-medium bg-transparent border-none cursor-pointer"
                >
                  {label}
                </button>
              ))}
            </nav>
            <p className="text-sm text-gray-500 font-medium">
              Made with <Heart size={14} className="inline text-red-500 fill-red-500 mx-0.5" /> by <strong className="text-gray-900">Muhammad Burhan</strong> | © 2024 SpinAI
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/muhammad-burhan-73a81b27b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-blue-600 transition-colors font-medium flex items-center gap-1.5"
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com/coddies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-gray-900 transition-colors font-medium flex items-center gap-1.5"
            >
              💻 GitHub
            </a>
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-violet-600 transition-colors font-medium flex items-center gap-1.5"
            >
              🌍 Portfolio
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Donate Button */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Keep SpinAI free & running!
        </div>
        {/* Bloom glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 120%, rgba(168,85,247,0.75) 0%, rgba(236,72,153,0.55) 45%, rgba(249,115,22,0.3) 70%, transparent 100%)',
            transform: 'translateY(8px) scaleX(1.2) scaleY(0.55)',
          }}
        />
        <a
          href="https://ko-fi.com"
          target="_blank"
          rel="noopener noreferrer"
          id="donate-floating-btn"
          className="relative overflow-hidden flex items-center gap-2 px-5 py-3 text-white rounded-full font-bold text-sm hover:scale-105 hover:-translate-y-0.5 transition-all"
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 25%, #ec4899 60%, #f97316 100%)',
            backgroundSize: '200% 200%',
            animation: 'btnGradientShift 3s ease infinite',
            boxShadow: '0 4px 20px rgba(124,58,237,0.4), 0 8px 30px rgba(236,72,153,0.25)',
          }}
        >
          <span
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: 'btnShimmer 3s ease-in-out infinite',
            }}
          />
          <span className="relative z-10">☕ Support SpinAI</span>
        </a>
      </div>

      {/* Winner Modal */}
      {showWinnerModal && winner && (
        <WinnerModal
          winner={winner}
          winnerIndex={winnerIndex}
          onClose={() => {
            setShowWinnerModal(false);
            setWinner(null);
          }}
          onSpinAgain={handleSpinAgain}
        />
      )}

      {/* Limit / Interstitial Modal */}
      {limitModal && (
        <LimitModal
          type={limitModal}
          onClose={() => setLimitModal(null)}
          onClaimReward={() => {
            claimReward(limitModal);
            setLimitModal(null);
          }}
        />
      )}

      {/* Info Pages Modal (About, Privacy, Contact) */}
      {infoModalOpen && (
        <InfoModal 
          type={infoModalOpen} 
          onClose={() => setInfoModalOpen(null)} 
        />
      )}
    </div>
  );
}

export default App;
