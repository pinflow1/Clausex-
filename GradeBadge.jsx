'use client';
import { GRADE_TONE } from '@/lib/constants';
import { COLORS } from '@/lib/colors';

export default function GradeBadge({ grade, size = 44, animate = false }) {
  const color = GRADE_TONE[grade] || COLORS.line;
  const display = grade === 'N/A' ? '–' : grade;

  return (
    <div
      className={`flex items-center justify-center rounded-full shrink-0 ${animate ? 'fp-badge-pop' : ''}`}
      style={{
        width: size,
        height: size,
        background: color,
        color: COLORS.ink,
        fontWeight: 700,
        fontSize: Math.round(size * 0.38),
      }}
    >
      {display}
    </div>
  );
}
