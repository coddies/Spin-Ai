import { useState, useCallback } from 'react';

const AI_BASELINE = 10;
const REWARD_AMOUNT = 3;
const MAX_REWARDS_PER_DAY = 3;

const getTodayKey = () => new Date().toISOString().split('T')[0];

const getStoredData = () => {
  try {
    const stored = localStorage.getItem('spinai_ai_usage');
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // Reset if date changed
    if (parsed.date !== getTodayKey()) return null;
    return parsed;
  } catch {
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem('spinai_ai_usage', JSON.stringify(data));
  } catch {
    /* ignore storage errors or private mode */
  }
};

/**
 * Hook to manage daily AI generation limits and rewarded ad claims.
 */
export const useAIUsage = () => {
  const [usageData, setUsageData] = useState(() => {
    const stored = getStoredData();
    return stored || {
      aiUsed: 0,
      rewardsClaimed: 0,
      bonusUses: 0,
      date: getTodayKey()
    };
  });

  const aiLeft = Math.max(0, (AI_BASELINE + usageData.bonusUses) - usageData.aiUsed);
  const canUseAI = aiLeft > 0;
  const rewardsRemaining = Math.max(0, MAX_REWARDS_PER_DAY - usageData.rewardsClaimed);
  const canClaimReward = rewardsRemaining > 0;

  const incrementAI = useCallback(() => {
    setUsageData(prev => {
      const updated = {
        ...prev,
        aiUsed: prev.aiUsed + 1,
        date: getTodayKey()
      };
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const claimReward = useCallback(() => {
    if (!canClaimReward) return false;

    setUsageData(prev => {
      const updated = {
        ...prev,
        rewardsClaimed: prev.rewardsClaimed + 1,
        bonusUses: prev.bonusUses + REWARD_AMOUNT,
        date: getTodayKey()
      };
      saveToStorage(updated);
      return updated;
    });
    return true;
  }, [canClaimReward]);

  return {
    aiLeft,
    aiUsed: usageData.aiUsed,
    canUseAI,
    rewardsRemaining,
    canClaimReward,
    incrementAI,
    claimReward,
    AI_BASELINE
  };
};
