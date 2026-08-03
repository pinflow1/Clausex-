'use client';
import { COLORS } from '@/lib/colors';
import GradeBadge from './GradeBadge';

export default function OverallGrade({ result }) {
  return (
    <div className="fp-reveal rounded-2xl p-5 flex items-center gap-4" style={{ background: COLORS.surface }}>
      <GradeBadge grade={result.overall_grade} size={56} animate />
      <div className="min-w-0">
        <p className="text-xs font-semibold" style={{ color: COLORS.inkSoft, letterSpacing: '0.04em' }}>
          OVERALL · {result.overall_score}/100
        </p>
        <p className="text-sm mt-1" style={{ color: COLORS.ink, fontWeight: 600 }}>{result.headline}</p>
      </div>
    </div>
  );
}
