'use client';
import { Sparkles } from 'lucide-react';
import { COLORS } from '@/lib/colors';

export default function ServiceTag({ category, setCategory, detecting, loading }) {
  if (!detecting && !category) return null;

  return (
    <div className="flex items-center gap-1.5 mb-2 px-1">
      <Sparkles size={12} className={detecting ? 'fp-dot-pulse' : ''} style={{ color: COLORS.inkSoft, flexShrink: 0 }} />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder={detecting ? 'Detecting service type…' : 'Service type'}
        disabled={loading}
        size={Math.max(12, (category || 'Detecting service type').length)}
        className="fp-input text-xs rounded-full"
        style={{ background: COLORS.surface, color: COLORS.ink, border: 'none', padding: '4px 12px' }}
      />
    </div>
  );
}
