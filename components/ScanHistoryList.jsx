'use client';
import { useEffect, useState } from 'react';
import { COLORS } from '@/lib/colors';
import { GRADE_TONE } from '@/lib/constants';

export default function ScanHistoryList({ user }) {
  const [scans, setScans] = useState(null);

  useEffect(() => {
    if (!user) { setScans([]); return; }
    user.getIdToken().then((token) => {
      fetch('/api/scans', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => setScans(d.scans || []));
    });
  }, [user]);

  if (!user) {
    return <p className="text-xs py-2" style={{ color: COLORS.inkSoft }}>Sign in to see your scan history.</p>;
  }
  if (scans === null) {
    return <p className="text-xs py-2" style={{ color: COLORS.inkSoft }}>Loading…</p>;
  }
  if (scans.length === 0) {
    return <p className="text-xs py-2" style={{ color: COLORS.inkSoft }}>Your scanned documents will appear here.</p>;
  }

  return (
    <div className="space-y-2 py-2">
      {scans.map((s) => (
        <div key={s.id} className="rounded-xl p-3 flex items-center gap-2" style={{ background: COLORS.surface }}>
          <span className="rounded-full shrink-0" style={{ width: 8, height: 8, background: GRADE_TONE[s.overall_grade] || COLORS.line }} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold truncate" style={{ color: COLORS.ink }}>{s.category || 'Scan'}</p>
            <p className="text-xs truncate" style={{ color: COLORS.inkSoft }}>{s.headline}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
