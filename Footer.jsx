'use client';
import Link from 'next/link';
import { COLORS } from '@/lib/colors';
import { APP_NAME } from '@/lib/brand';

export default function Footer() {
  return (
    <>
      <div className="max-w-2xl mx-auto w-full px-5 py-14 text-center">
        <h2 className="text-2xl mb-5 font-serif" style={{ fontWeight: 400, color: COLORS.ink }}>
          Ready to see what you agreed to?
        </h2>
        <Link
          href="/scan"
          className="fp-btn inline-block rounded-full text-sm font-semibold"
          style={{ background: COLORS.lime, color: COLORS.ink, padding: '13px 28px', textDecoration: 'none' }}
        >
          Scan for free →
        </Link>
      </div>
      <div style={{ borderTop: `1px solid ${COLORS.line}` }}>
        <div className="max-w-2xl mx-auto w-full px-5 py-6 text-center">
          <p className="text-xs" style={{ color: COLORS.inkSoft }}>{APP_NAME} — read the part nobody reads.</p>
        </div>
      </div>
    </>
  );
}
