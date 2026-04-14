import React, { useState, useRef } from 'react';
import { Plus, Shuffle, Trash2, Tag } from 'lucide-react';
import { getSegmentColor } from '../utils/colors';

const MAX_ITEMS = 12;
const MIN_ITEMS = 2;

/**
 * ItemsList component – editable chips panel for managing wheel items
 * Features: add, delete, shuffle, clear all, item count display
 */
const ItemsList = ({ items, setItems }) => {
  const [inputValue, setInputValue] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const addItem = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (items.length >= MAX_ITEMS) {
      setError(`Maximum ${MAX_ITEMS} items allowed`);
      return;
    }
    if (items.includes(trimmed)) {
      setError('Item already exists');
      return;
    }
    setItems([...items, trimmed]);
    setInputValue('');
    setError('');
  };

  const deleteItem = (index) => {
    if (items.length <= MIN_ITEMS) {
      setError(`Minimum ${MIN_ITEMS} items required`);
      setTimeout(() => setError(''), 2000);
      return;
    }
    setItems(items.filter((_, i) => i !== index));
    setError('');
  };

  const shuffleItems = () => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setItems(shuffled);
  };

  const clearAll = () => {
    setItems(['Option 1', 'Option 2']);
    setShowClearConfirm(false);
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addItem();
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag size={18} className="text-violet-600" />
          <h2 className="font-bold text-gray-800 text-base">Wheel Items</h2>
        </div>
        <span className="text-xs font-semibold bg-gradient-to-r from-violet-100 to-pink-100 text-violet-700 px-3 py-1 rounded-full border border-violet-200">
          {items.length}/{MAX_ITEMS} items
        </span>
      </div>

      {/* Add Item Input */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full mb-4">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type an item..."
          maxLength={30}
          id="add-item-input"
          className="flex-1 w-full px-3 py-3 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all"
        />
        {/* Add button with bloom glow */}
        <div className="relative group w-full sm:w-auto">
          <div
            className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 120%, rgba(168,85,247,0.65) 0%, rgba(236,72,153,0.45) 50%, transparent 100%)',
              transform: 'translateY(4px) scaleX(1.1) scaleY(0.5)',
            }}
          />
          <button
            onClick={addItem}
            disabled={items.length >= MAX_ITEMS || !inputValue.trim()}
            id="add-item-btn"
            className="relative overflow-hidden w-full sm:w-auto px-4 py-3 sm:py-2.5 text-white rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-1.5 shadow-md active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 30%, #ec4899 70%, #f97316 100%)',
              backgroundSize: '200% 200%',
              animation: 'btnGradientShift 3s ease infinite',
            }}
          >
            {/* shimmer sweep */}
            <span
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'btnShimmer 2.8s ease-in-out infinite',
              }}
            />
            <Plus size={16} className="relative z-10" />
            <span className="relative z-10">Add Item</span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-rose-500 mb-3 font-medium animate-fade-in">⚠ {error}</p>
      )}

      {/* Items as Chips */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[80px]">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-sm font-semibold shadow-md hover:scale-105 transition-all duration-200 cursor-default animate-fade-in"
            style={{ backgroundColor: getSegmentColor(index) }}
          >
            <span className="max-w-[120px] truncate">{item}</span>
            <button
              onClick={() => deleteItem(index)}
              className="w-4 h-4 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors text-white/80 hover:text-white leading-none text-xs"
              aria-label={`Remove ${item}`}
              id={`delete-item-${index}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {/* Shuffle button with amber–orange–pink bloom */}
        <div className="relative group flex-1">
          <div
            className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 120%, rgba(251,146,60,0.7) 0%, rgba(236,72,153,0.4) 60%, transparent 100%)',
              transform: 'translateY(4px) scaleX(1.1) scaleY(0.5)',
            }}
          />
          <button
            onClick={shuffleItems}
            id="shuffle-btn"
            className="relative overflow-hidden w-full flex items-center justify-center gap-2 py-2.5 px-3 text-white rounded-xl text-sm font-semibold hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all shadow-md"
            style={{
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 30%, #ec4899 70%, #f43f5e 100%)',
              backgroundSize: '200% 200%',
              animation: 'btnGradientShift 3s ease infinite',
              boxShadow: '0 4px 14px rgba(249,115,22,0.35), 0 6px 20px rgba(236,72,153,0.2)',
            }}
          >
            <span
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
                animation: 'btnShimmer 3s ease-in-out infinite',
              }}
            />
            <Shuffle size={15} className="relative z-10" />
            <span className="relative z-10">Shuffle</span>
          </button>
        </div>

        {!showClearConfirm ? (
          <button
            onClick={() => setShowClearConfirm(true)}
            id="clear-all-btn"
            className="btn-white flex-1 py-2.5 px-3 border border-rose-200 text-rose-500 rounded-xl text-sm font-semibold hover:scale-105 transition-all shadow-sm"
          >
            <span className="btn-content">
              <Trash2 size={15} />
              Clear All
            </span>
          </button>
        ) : (
          <div className="flex-1 flex gap-1.5 animate-fade-in">
            <button
              onClick={clearAll}
              id="confirm-clear-btn"
              className="flex-1 py-2.5 px-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-colors"
            >
              Yes, clear!
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              id="cancel-clear-btn"
              className="btn-white flex-1 py-2.5 px-2 rounded-xl text-xs font-bold border border-gray-100"
            >
              <span className="btn-content">Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Item count indicator */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full transition-all duration-500"
            style={{ width: `${(items.length / MAX_ITEMS) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
          {MAX_ITEMS - items.length} slots left
        </span>
      </div>
    </div>
  );
};

export default ItemsList;
