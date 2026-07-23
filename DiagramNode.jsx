'use client';
import { COLORS } from '@/lib/colors';

export default function DiagramNode({ left, top, width, height, icon, label, sub, boxBg, boxBorder, size }) {
  return (
    <div
      className="absolute flex flex-col items-center text-center"
      style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` }}
    >
      <div
        className="rounded-xl flex items-center justify-center mb-1.5"
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          maxWidth: size || 44,
          background: boxBg || COLORS.surface,
          border: `1px solid ${boxBorder || COLORS.line}`,
        }}
      >
        {icon}
      </div>
      <p className="text-xs font-semibold leading-tight" style={{ color: COLORS.ink }}>{label}</p>
      <p style={{ color: COLORS.inkSoft, fontSize: 10, marginTop: 2 }}>{sub}</p>
    </div>
  );
}
