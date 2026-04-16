import React, { useState, useEffect } from 'react';
import { X, Play, Loader2, CheckCircle2 } from 'lucide-react';

/**
 * RewardedAdModal – simulating a rewarded video experience.
 * Users wait 10 seconds to get +3 AI generations.
 */
const RewardedAdModal = ({ onClose, onRewardClaimed, rewardsRemaining }) => {
  const [status, setStatus] = useState('idle'); // 'idle' | 'watching' | 'rewarded'
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    let timer;
    if (status === 'watching' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (status === 'watching' && countdown === 0) {
      setStatus('rewarded');
      onRewardClaimed();
      // Auto-close after 2 seconds of showing success
      timer = setTimeout(() => {
        onClose();
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [status, countdown, onRewardClaimed, onClose]);

  const startWatching = () => {
    setStatus('watching');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fade-in" 
        onClick={status === 'watching' ? undefined : onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center animate-scale-in">
        
        {/* Close Button */}
        {status !== 'watching' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        )}

        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Play size={28} className="text-violet-600 translate-x-0.5" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2">
            ✨ Get More AI Generations!
          </h2>
          <p className="text-sm text-gray-500">
            Watch a short ad to get <strong className="text-violet-600">3 more</strong> free AI uses instantly!
          </p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
            {rewardsRemaining} bonus reward{rewardsRemaining !== 1 ? 's' : ''} left today
          </p>
        </div>

        {/* Ad Placeholder Box */}
        <div 
          className="ad-slot-rewarded w-[300px] h-[250px] mx-auto mb-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3"
        >
          <div className="text-gray-300">
            <Play size={48} opacity={0.2} />
          </div>
          <p className="text-xs text-gray-400 font-medium italic">Ad will appear here</p>
        </div>

        {/* Action Button / Feedback */}
        <div className="min-h-[56px] flex items-center justify-center">
          {status === 'idle' && (
            <button
              onClick={startWatching}
              className="relative overflow-hidden w-full py-3.5 px-6 text-white rounded-2xl font-bold text-base hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 transition-all shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
              }}
            >
               <span className="flex items-center justify-center gap-2">
                  <Play size={18} fill="currentColor" />
                  Watch Ad & Get 3 Uses
               </span>
            </button>
          )}

          {status === 'watching' && (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-3 text-violet-600 font-bold">
                <Loader2 size={20} className="animate-spin" />
                <span>Please wait... {countdown}s</span>
              </div>
              <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-violet-600 transition-all duration-1000 ease-linear"
                  style={{ width: `${(10 - countdown) * 10}%` }}
                />
              </div>
            </div>
          )}

          {status === 'rewarded' && (
            <div className="flex items-center gap-2 text-emerald-600 font-bold animate-bounce-in">
              <CheckCircle2 size={24} />
              <span>✅ 3 AI uses added!</span>
            </div>
          )}
        </div>

        {status === 'idle' && (
          <button 
            onClick={onClose}
            className="mt-4 text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors"
          >
            Maybe Later
          </button>
        )}
      </div>
    </div>
  );
};

export default RewardedAdModal;
