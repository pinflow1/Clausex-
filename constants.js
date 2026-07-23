import { COLORS } from './colors';

export const MAX_CHARS = 12000;
export const DETECT_CHARS = 3000;
export const DETECT_MIN_CHARS = 60;

export const LOADING_MESSAGES = [
  'Reading document…',
  'Checking data sharing…',
  'Checking tracking…',
  'Checking arbitration…',
  'Checking auto-renewal…',
  'Checking data retention…',
];

export const GRADE_TONE = {
  A: COLORS.lime,
  B: COLORS.lime,
  C: COLORS.amber,
  D: COLORS.orange,
  F: COLORS.red,
  'N/A': COLORS.line,
};

export const SEVERITY_TONE = {
  high: { label: 'High risk', color: COLORS.red },
  medium: { label: 'Medium risk', color: COLORS.orange },
  low: { label: 'Worth knowing', color: COLORS.amber },
};
