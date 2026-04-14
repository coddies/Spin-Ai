import React from 'react';

/**
 * AdSlot wrapper component for Google AdSense integration.
 * Place your AdSense code inside the designated comments.
 * 
 * Usage:
 * <AdSlot type="leaderboard" /> - 728x90 top banner
 * <AdSlot type="rectangle" />   - 300x250 sidebar
 * <AdSlot type="mobile-banner" /> - 320x50 mobile
 */
const AdSlot = ({ type = 'rectangle', className = '' }) => {
  const sizes = {
    leaderboard: { width: 728, height: 90, label: 'Leaderboard (728×90)' },
    rectangle: { width: 300, height: 250, label: 'Rectangle (300×250)' },
    'mobile-banner': { width: 320, height: 50, label: 'Mobile Banner (320×50)' },
  };

  const size = sizes[type] || sizes.rectangle;

  return (
    <div
      className={`adsense-slot mx-auto flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-xl overflow-hidden max-w-full ${className}`}
      style={{ minHeight: size.height, width: size.width, maxWidth: '100%' }}
      aria-label="Advertisement"
      id={`ad-slot-${type}`}
    >
      {/* ==========================================
          ADSENSE PLACEMENT - ${size.label}
          Paste your AdSense <ins> tag below this comment
          and remove the placeholder div
          ========================================== */}
      <div className="text-center p-4">
        <p className="text-xs text-gray-400 font-medium">AD · {size.label}</p>
        {/* 
          Example AdSense code:
          <ins class="adsbygoogle"
               style="display:block"
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        */}
      </div>
    </div>
  );
};

export default AdSlot;
