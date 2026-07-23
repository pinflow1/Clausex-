'use client';
import { COLORS } from '@/lib/colors';

export default function Hero() {
  return (
    <>
      <h1 className="text-3xl mb-3 font-serif" style={{ fontWeight: 400, color: COLORS.ink, lineHeight: 1.2 }}>
        Know what you're
        <br />
        signing up for.
      </h1>
      <p className="text-sm leading-relaxed" style={{ color: COLORS.inkSoft }}>
        Paste a terms of service or privacy policy, or attach a screenshot of one.
      </p>
    </>
  );
}
