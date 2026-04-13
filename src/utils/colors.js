// Segment color palette for the wheel
export const SEGMENT_COLORS = [
  '#7c3aed', // purple-600
  '#a855f7', // purple-500
  '#ec4899', // pink-500
  '#f43f5e', // rose-500
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#eab308', // yellow-500
  '#06b6d4', // cyan-500
];

/**
 * Returns color for a segment index (cycles through palette)
 */
export const getSegmentColor = (index) => {
  return SEGMENT_COLORS[index % SEGMENT_COLORS.length];
};

/**
 * Returns a lighter version for text contrast
 */
export const getTextColor = (bgColor) => {
  // All our colors are dark enough for white text
  return '#ffffff';
};
