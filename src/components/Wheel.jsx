import React, { useEffect, useRef, useCallback, useState } from 'react';
import { getSegmentColor } from '../utils/colors';
import { playTick, playWin, resumeAudio } from '../utils/audio';

const POINTER_ANGLE = -Math.PI / 2; // Top center = -90 degrees

/**
 * Main Wheel Spinner component built with HTML Canvas.
 * Features:
 * - Smooth easeOut deceleration animation (4-5 seconds)
 * - Tick sounds on each segment pass
 * - Win sound on stop
 * - Glow effect on outer ring
 * - Pointer arrow at top center
 */
const Wheel = ({ items, onResult, isSpinning, setIsSpinning, onSpinStart }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const currentAngleRef = useRef(0);
  const lastTickSegmentRef = useRef(-1);
  const [canvasSize, setCanvasSize] = useState(420);

  // Responsive canvas size
  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      if (vw < 380) setCanvasSize(300);
      else if (vw < 640) setCanvasSize(340);
      else if (vw < 768) setCanvasSize(380);
      else setCanvasSize(420);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const segmentCount = items.length;
  const segmentAngle = (2 * Math.PI) / segmentCount;

  /**
   * Draw the wheel on canvas
   */
  const drawWheel = useCallback(
    (angle) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const size = canvasSize;
      const cx = size / 2;
      const cy = size / 2;
      const radius = size / 2 - 20;

      ctx.clearRect(0, 0, size, size);

      // Outer glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius + 18);
      glowGrad.addColorStop(0, 'rgba(124,58,237,0)');
      glowGrad.addColorStop(0.7, 'rgba(124,58,237,0.15)');
      glowGrad.addColorStop(1, 'rgba(236,72,153,0.1)');
      ctx.beginPath();
      ctx.arc(cx, cy, radius + 18, 0, 2 * Math.PI);
      ctx.fillStyle = glowGrad;
      ctx.fill();

      // Draw segments
      items.forEach((item, i) => {
        const startAngle = angle + i * segmentAngle;
        const endAngle = startAngle + segmentAngle;
        const color = getSegmentColor(i);

        // Segment fill
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        // Segment border
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(startAngle + segmentAngle / 2);

        const textRadius = radius * 0.65;
        ctx.font = `bold ${Math.max(10, Math.min(14, canvasSize / 30))}px Poppins, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'right';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;

        const maxChars = Math.max(6, Math.floor(20 / segmentCount));
        const displayText = item.length > maxChars ? item.slice(0, maxChars) + '…' : item;
        ctx.fillText(displayText, textRadius, 5);
        ctx.restore();
      });

      // Center circle gradient
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28);
      centerGrad.addColorStop(0, '#ffffff');
      centerGrad.addColorStop(0.5, '#f3e8ff');
      centerGrad.addColorStop(1, '#7c3aed');
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, 2 * Math.PI);
      ctx.fillStyle = centerGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Center spin icon
      ctx.font = `${Math.max(14, canvasSize / 28)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 0;
      ctx.fillText('🎡', cx, cy);

      // Outer ring border with gradient
      const ringGrad = ctx.createLinearGradient(0, 0, size, size);
      ringGrad.addColorStop(0, '#7c3aed');
      ringGrad.addColorStop(0.5, '#ec4899');
      ringGrad.addColorStop(1, '#f97316');
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 4;
      ctx.stroke();
    },
    [items, segmentAngle, canvasSize]
  );

  // Redraw on angle/items/size change
  useEffect(() => {
    drawWheel(currentAngleRef.current);
  }, [drawWheel, canvasSize]);

  /**
   * Start the spin animation with easeOut deceleration
   */
  const spin = useCallback(() => {
    if (isSpinning || items.length < 2) return;
    // Check limit gate
    if (onSpinStart && !onSpinStart()) return;
    resumeAudio();
    setIsSpinning(true);

    // Random total rotation: 5-10 full spins + random offset
    const extraSpins = (5 + Math.random() * 5) * 2 * Math.PI;
    const startAngle = currentAngleRef.current;
    const targetAngle = startAngle + extraSpins;
    const duration = 4500 + Math.random() * 500; // 4.5-5s

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // EaseOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentAngle = startAngle + (targetAngle - startAngle) * eased;
      currentAngleRef.current = currentAngle;

      drawWheel(currentAngle);

      // Tick sound: detect segment change
      const normalizedAngle = ((currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const pointerRelative = ((POINTER_ANGLE - normalizedAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const currentSegment = Math.floor(pointerRelative / segmentAngle) % segmentCount;
      if (currentSegment !== lastTickSegmentRef.current) {
        lastTickSegmentRef.current = currentSegment;
        if (progress < 0.95) playTick();
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Determine winner from final angle
        const finalAngle = ((targetAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const relativeToPointer = ((POINTER_ANGLE - finalAngle) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const winnerIndex = Math.floor(relativeToPointer / segmentAngle) % segmentCount;
        playWin();
        setIsSpinning(false);
        onResult(items[winnerIndex], winnerIndex);
      }
    };

    animRef.current = requestAnimationFrame(animate);
  }, [isSpinning, items, segmentAngle, segmentCount, drawWheel, onResult, setIsSpinning]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4" id="wheel">
      {/* Pointer Arrow */}
      <div className="relative" style={{ width: canvasSize, maxWidth: '100%' }}>
        {/* Arrow pointing down at top center */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
          style={{ top: -2 }}
        >
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '28px solid #7c3aed',
              filter: 'drop-shadow(0 4px 8px rgba(124,58,237,0.5))',
            }}
          />
        </div>

        {/* Canvas with glow */}
        <div
          className={`rounded-full transition-all duration-300 ${
            isSpinning ? 'animate-pulse-glow' : ''
          }`}
          style={{
            boxShadow: isSpinning
              ? '0 0 50px rgba(124,58,237,0.5), 0 0 100px rgba(236,72,153,0.3)'
              : '0 0 30px rgba(124,58,237,0.25), 0 0 60px rgba(236,72,153,0.15)',
          }}
        >
          <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            className="block rounded-full cursor-pointer"
            onClick={spin}
            style={{ maxWidth: '100%', touchAction: 'manipulation' }}
            aria-label="Spin the wheel"
            id="spin-wheel-canvas"
          />
        </div>
      </div>

      {/* Spin Button */}
      <div className="relative group">
        {/* Light bloom behind button */}
        <div
          className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 pointer-events-none ${
            isSpinning || items.length < 2 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
          }`}
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.7) 0%, rgba(236,72,153,0.5) 40%, rgba(249,115,22,0.3) 70%, transparent 100%)',
            transform: 'translateY(6px) scaleX(1.15) scaleY(0.6)',
          }}
        />
        <button
          onClick={spin}
          disabled={isSpinning || items.length < 2}
          id="spin-button"
          className={`
            relative overflow-hidden px-10 py-3.5 rounded-2xl font-bold text-white text-lg
            shadow-lg transition-all duration-300
            ${
              isSpinning || items.length < 2
                ? 'opacity-60 cursor-not-allowed scale-95'
                : 'hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer'
            }
          `}
          style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 25%, #ec4899 60%, #f97316 100%)',
            backgroundSize: '200% 200%',
            animation: isSpinning ? 'none' : 'btnGradientShift 3s ease infinite',
            boxShadow: isSpinning || items.length < 2
              ? 'none'
              : '0 4px 20px rgba(124,58,237,0.4), 0 8px 32px rgba(236,72,153,0.2)',
          }}
        >
          {/* Shimmer vector sweep */}
          {!(isSpinning || items.length < 2) && (
            <span
              className="absolute inset-0 pointer-events-none rounded-2xl"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'btnShimmer 2.5s ease-in-out infinite',
              }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {isSpinning ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Spinning…
              </>
            ) : (
              <>🎡 SPIN!</>
            )}
          </span>
        </button>
      </div>

      {items.length < 2 && (
        <p className="text-sm text-gray-400 text-center">Add at least 2 items to spin</p>
      )}
    </div>
  );
};

export default Wheel;
