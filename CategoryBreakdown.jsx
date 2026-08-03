'use client';
import { COLORS } from '@/lib/colors';
import { GRADE_TONE } from '@/lib/constants';

export default function CategoryBreakdown({ categories }) {
  return (
    <div className="fp-reveal" style={{ animationDelay: '0.08s' }}>
      <p className="text-xs font-semibold mb-2 px-1" style={{ color: COLORS.inkSoft, letterSpacing: '0.04em' }}>
        CATEGORY BREAKDOWN
      </p>
      <div className="flex flex-wrap gap-2">
        {(categories || []).map((cat, i) => (
          <div key={i} className="inline-flex items-center gap-2 rounded-full" style={{ background: COLORS.surface, padding: '8px 14px 8px 10px' }}>
            <span className="rounded-full shrink-0" style={{ width: 8, height: 8, background: GRADE_TONE[cat.grade] || COLORS.line }} />
            <span className="text-sm" style={{ color: COLORS.ink, fontWeight: 600 }}>{cat.name}</span>
            <span className="text-xs" style={{ color: COLORS.inkSoft }}>{cat.grade}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
