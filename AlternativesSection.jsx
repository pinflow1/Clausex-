'use client';
import { Lock } from 'lucide-react';
import { COLORS } from '@/lib/colors';

export default function AlternativesSection({ alternatives, tier, onUnlockClick, delay }) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div className="fp-reveal" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center gap-2 mb-2 px-1">
        <p className="text-xs font-semibold" style={{ color: COLORS.inkSoft, letterSpacing: '0.04em' }}>BETTER ALTERNATIVES</p>
        <span className="text-xs font-semibold rounded-full" style={{ background: COLORS.ink, color: COLORS.lime, padding: '1px 9px' }}>PRO</span>
      </div>

      {tier === 'free' ? (
        <button onClick={onUnlockClick} className="fp-link w-full rounded-2xl p-4 flex items-center gap-3 text-left" style={{ background: COLORS.surface, border: `1px dashed ${COLORS.line}` }}>
          <Lock size={16} color={COLORS.inkSoft} className="shrink-0" />
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-semibold" style={{ color: COLORS.ink }}>
              {alternatives.length} alternative{alternatives.length > 1 ? 's' : ''} found
            </span>
            <span className="block text-xs mt-0.5" style={{ color: COLORS.inkSoft }}>Start your free trial to see them</span>
          </span>
          <span className="text-xs font-semibold rounded-full shrink-0" style={{ background: COLORS.ink, color: COLORS.lime, padding: '5px 12px' }}>Unlock</span>
        </button>
      ) : (
        <>
          <div className="space-y-2">
            {alternatives.map((alt, i) => (
              <div key={i} className="rounded-2xl p-4" style={{ background: COLORS.surface, borderLeft: `4px solid ${COLORS.lime}` }}>
                <p className="text-sm" style={{ color: COLORS.ink, fontWeight: 600 }}>{alt.name}</p>
                <p className="text-xs mt-1" style={{ color: COLORS.inkSoft }}>{alt.reason}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-2 px-1" style={{ color: COLORS.inkSoft }}>AI-suggested based on general reputation — verify before switching.</p>
        </>
      )}
    </div>
  );
}
