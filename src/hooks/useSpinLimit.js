import { useState, useCallback } from 'react';

const SPIN_LIMIT = 20;
const AI_LIMIT = 5;

const getTodayKey = () => new Date().toISOString().split('T')[0]; // YYYY-MM-DD

const getLimitsFromStorage = () => {
  try {
    const stored = localStorage.getItem('spinai_limits');
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // Reset if date changed
    if (parsed.date !== getTodayKey()) return null;
    return parsed;
  } catch {
    return null;
  }
};

const saveLimitsToStorage = (limits) => {
  try {
    localStorage.setItem('spinai_limits', JSON.stringify(limits));
  } catch {
    // Storage quota or private mode
  }
};

const getInitialLimits = () => {
  const stored = getLimitsFromStorage();
  if (stored) {
    return {
      spinsUsed: stored.spinsUsed || 0,
      aiUsed: stored.aiUsed || 0,
      date: stored.date,
    };
  }
  return {
    spinsUsed: 0,
    aiUsed: 0,
    date: getTodayKey(),
  };
};

/**
 * Hook to track and enforce daily usage limits for spins and AI generations
 */
export const useSpinLimit = () => {
  const [limits, setLimits] = useState(getInitialLimits);

  const spinsLeft = Math.max(0, SPIN_LIMIT - limits.spinsUsed);
  const aiLeft = Math.max(0, AI_LIMIT - limits.aiUsed);
  const canSpin = spinsLeft > 0;
  const canUseAI = aiLeft > 0;

  const incrementSpins = useCallback(() => {
    setLimits((prev) => {
      const updated = {
        ...prev,
        spinsUsed: prev.spinsUsed + 1,
        date: getTodayKey(),
      };
      saveLimitsToStorage(updated);
      return updated;
    });
  }, []);

  const incrementAI = useCallback(() => {
    setLimits((prev) => {
      const updated = {
        ...prev,
        aiUsed: prev.aiUsed + 1,
        date: getTodayKey(),
      };
      saveLimitsToStorage(updated);
      return updated;
    });
  }, []);

  const claimReward = useCallback(() => {
    setLimits((prev) => {
      // Reward gives +10 spins and +3 AI uses (by reducing usage count)
      const updated = {
        ...prev,
        spinsUsed: Math.max(0, prev.spinsUsed - 10),
        aiUsed: Math.max(0, prev.aiUsed - 3),
        date: getTodayKey(),
      };
      saveLimitsToStorage(updated);
      return updated;
    });
  }, []);

  return {
    spinsLeft,
    aiLeft,
    canSpin,
    canUseAI,
    spinsUsed: limits.spinsUsed,
    aiUsed: limits.aiUsed,
    incrementSpins,
    incrementAI,
    claimReward,
    SPIN_LIMIT,
    AI_LIMIT,
  };
};
