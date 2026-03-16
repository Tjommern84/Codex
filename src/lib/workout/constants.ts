// Bell-curve intensity windows per 30-minute block
// Port av BLOCK_WINDOWS fra WorkoutGenerator.java
export const BLOCK_WINDOWS = [
  { startMin: 0,  endMin: 5,  minIntensity: 1, maxIntensity: 2 },
  { startMin: 5,  endMin: 10, minIntensity: 2, maxIntensity: 3 },
  { startMin: 10, endMin: 15, minIntensity: 4, maxIntensity: 5 },
  { startMin: 15, endMin: 20, minIntensity: 5, maxIntensity: 6 }, // peak
  { startMin: 20, endMin: 25, minIntensity: 4, maxIntensity: 5 },
  { startMin: 25, endMin: 30, minIntensity: 2, maxIntensity: 3 },
] as const

export const BLOCK_SIZE_MIN = 30
export const MAX_TOTAL_MINUTES = 300
export const MAX_SECTION_MINUTES = 180
