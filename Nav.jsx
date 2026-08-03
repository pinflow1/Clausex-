'use client';
import Link from 'next/link';
import { COLORS } from '@/lib/colors';
import { APP_NAME } from '@/lib/brand';

export default function Nav() {
  return (
    <div className="max-w-4xl mx-auto w-full px-5 py-5 flex items-center justify-between">
      <span className="text-sm font-bold" style={{ color: COLORS.ink, letterSpacing: '0.02em' }}>
        {APP_NAME.toUpperCase()}
      </span>
      <Link
        href="/scan"
        className="fp-btn rounded-full text-sm font-semibold"
        style={{ background: COLORS.ink, color: '#FFFFFF', padding: '8px 18px', textDecoration: 'none' }}
      >
        Try it free
      </Link>
    </div>
  );
}
