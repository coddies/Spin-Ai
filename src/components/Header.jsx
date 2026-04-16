import React from 'react';
import { Zap, Target, Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Header component with logo, tagline, and daily limit badges
 */
const Header = ({ aiUsed, aiLeft }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-white/40 shadow-sm sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="text-2xl sm:text-3xl animate-float">🎡</div>
            <div className="min-w-0">
              <div className="text-lg sm:text-2xl font-black bg-gradient-to-r from-violet-600 via-pink-500 to-orange-500 bg-clip-text text-transparent leading-none sm:leading-tight">
                SpinAI
              </div>
              <p className="text-[10px] text-gray-500 font-medium hidden sm:block">
                Spin smarter with AI
              </p>
            </div>
          </div>

          {/* AI Usage Badges - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Total AI Used</span>
              <span className="text-sm font-black text-gray-800">{aiUsed}</span>
            </div>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <div className="flex flex-col items-start translate-y-[-1px]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-violet-500">AI Uses Left</span>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                <span className="text-sm font-black text-violet-600">{aiLeft}</span>
              </div>
            </div>
          </div>

          {/* Mobile UI */}
          <div className="flex md:hidden items-center gap-3">
             <div className="flex items-center gap-1.5 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                <Zap size={12} className="text-violet-500 fill-violet-500" />
                <span className="text-xs font-black text-violet-700">{aiLeft}</span>
             </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 sm:p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <a href="#wheel" className="text-sm font-medium text-gray-700 hover:text-violet-600 py-2 px-2 rounded-lg hover:bg-violet-50 transition-colors" onClick={() => setMobileOpen(false)}>
                🎡 Spin Wheel
              </a>
              <a href="#ai-panel" className="text-sm font-medium text-gray-700 hover:text-pink-600 py-2 px-2 rounded-lg hover:bg-pink-50 transition-colors" onClick={() => setMobileOpen(false)}>
                ✨ AI Generator
              </a>
              <a href="#history" className="text-sm font-medium text-gray-700 hover:text-orange-600 py-2 px-2 rounded-lg hover:bg-orange-50 transition-colors" onClick={() => setMobileOpen(false)}>
                📜 History
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
