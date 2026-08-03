'use client';
import { COLORS } from '@/lib/colors';
import { SEVERITY_TONE } from '@/lib/constants';

export default function FlaggedClauses({ flags }) {
  return (
    <div>
      <p className="text-xs font-semibold mb-2 px-1" style={{ color: COLORS.inkSoft, letterSpacing: '0.04em' }}>
        FLAGGED CLAUSES
      </p>
      <div className="space-y-2">
        {(flags || []).map((flag, i) => {
          const tone = SEVERITY_TONE[flag.severity] || SEVERITY_TONE.low;
          return (
            <div key={i} className="fp-reveal rounded-2xl p-4" style={{ background: COLORS.surface, animationDelay: `${0.24 + i * 0.07}s` }}>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="rounded-full text-xs font-semibold" style={{ background: tone.color, color: COLORS.ink, padding: '3px 10px' }}>
                  {tone.label}
                </span>
                <span className="text-xs" style={{ color: COLORS.inkSoft }}>{flag.category}</span>
              </div>
              <p className="text-sm" style={{ color: COLORS.ink, fontWeight: 600 }}>{flag.title}</p>
              <p className="text-xs mt-1" style={{ color: COLORS.inkSoft }}>{flag.explanation}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
