'use client';
import Link from 'next/link';
import { COLORS } from '@/lib/colors';
import { APP_TAGLINE } from '@/lib/brand';

export default function Hero() {
  return (
    <div className="max-w-2xl mx-auto w-full px-5 pt-8 pb-4 text-center">
      <h1 className="text-4xl md:text-5xl mb-4 font-serif" style={{ fontWeight: 400, color: COLORS.ink, lineHeight: 1.15 }}>
        {APP_TAGLINE}
      </h1>
      <p className="text-base leading-relaxed mb-7 max-w-md mx-auto" style={{ color: COLORS.inkSoft }}>
        Paste a terms of service or privacy policy — or just screenshot one — and get a plain-English risk score in seconds.
      </p>
      <Link
        href="/scan"
        className="fp-btn inline-block rounded-full text-sm font-semibold"
        style={{ background: COLORS.lime, color: COLORS.ink, padding: '13px 28px', textDecoration: 'none' }}
      >
        Scan for free →
      </Link>
      <p className="text-xs mt-3" style={{ color: COLORS.inkSoft }}>No account needed to try it.</p>
    </div>
  );
}
