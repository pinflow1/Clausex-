'use client';
import { COLORS } from '@/lib/colors';

export default function SummaryList({ summary }) {
  return (
    <div className="fp-reveal" style={{ animationDelay: '0.16s' }}>
      <p className="text-xs font-semibold mb-2 px-1" style={{ color: COLORS.inkSoft, letterSpacing: '0.04em' }}>
        WHAT THIS ACTUALLY MEANS
      </p>
      <ul className="rounded-2xl p-5 space-y-2" style={{ background: COLORS.surface }}>
        {(summary || []).map((line, i) => (
          <li key={i} className="text-sm flex gap-2" style={{ color: COLORS.ink }}>
            <span>•</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
