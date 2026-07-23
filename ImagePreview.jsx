'use client';
import { X } from 'lucide-react';
import { COLORS } from '@/lib/colors';

export default function ImagePreview({ image, onRemove }) {
  if (!image) return null;

  return (
    <div className="inline-flex items-center gap-2 rounded-xl mb-2" style={{ background: COLORS.surface, padding: '5px 8px 5px 5px' }}>
      <img
        src={`data:${image.mediaType};base64,${image.base64}`}
        alt="Attached screenshot"
        className="rounded-lg object-cover shrink-0"
        style={{ width: 34, height: 34 }}
      />
      <span className="text-xs truncate" style={{ color: COLORS.inkSoft, maxWidth: 140 }}>{image.name}</span>
      <button
        onClick={onRemove}
        className="fp-link rounded-full flex items-center justify-center shrink-0"
        style={{ width: 20, height: 20, color: COLORS.inkSoft, border: 'none', background: 'transparent' }}
        aria-label="Remove attached image"
      >
        <X size={14} />
      </button>
    </div>
  );
}
