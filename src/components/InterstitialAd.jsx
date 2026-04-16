import React from 'react';
import { X } from 'lucide-react';
import AdSlot from './AdSlot';

/**
 * InterstitialAd - A recurring popup modal that displays a 300x250 ad.
 * Designed with glassmorphism to match the SpinAI aesthetic.
 */
const InterstitialAd = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 bg-white/90 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full animate-scale-in text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100/50 rounded-full"
          aria-label="Close Ad"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-5">
          <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
            Sponsored
          </span>
          <h2 className="mt-4 text-xl font-black text-gray-900 leading-tight">
             Quick Break! ✨
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            While you wait, check out this offer
          </p>
        </div>

        {/* Ad Slot - 300x250 */}
        <div className="flex justify-center mb-6">
          <AdSlot type="rectangle" className="shadow-inner border-2 border-dashed border-gray-100" />
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-6 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-black hover:scale-[1.02] transition-all shadow-lg active:scale-95"
        >
          Continue to SpinAI
        </button>

        <p className="mt-4 text-[10px] text-gray-400 italic">
          Ads help keep SpinAI free to use.
        </p>
      </div>
    </div>
  );
};

export default InterstitialAd;
