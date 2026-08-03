'use client';
import { COLORS } from '@/lib/colors';

export default function ErrorState({ error, raw }) {
  return (
    <div className="rounded-2xl p-4 mb-4" style={{ background: COLORS.surface, borderLeft: `4px solid ${COLORS.red}` }}>
      <p className="text-sm font-semibold" style={{ color: COLORS.red }}>{error}</p>
      {raw && (
        <pre className="mt-3 text-xs p-3 rounded-xl overflow-auto whitespace-pre-wrap" style={{ background: COLORS.paper, color: COLORS.inkSoft }}>
          {raw}
        </pre>
      )}
    </div>
  );
}
