'use client';
import Link from 'next/link';
import { User } from 'lucide-react';
import { COLORS } from '@/lib/colors';
import { APP_NAME } from '@/lib/brand';

export default function Header({ onProfileClick }) {
  return (
    <div className="max-w-2xl mx-auto w-full px-5 pt-6 flex items-center justify-between">
      <Link
        href="/"
        className="inline-block rounded-full text-xs font-semibold"
        style={{ background: COLORS.ink, color: COLORS.paper, padding: '5px 12px', letterSpacing: '0.06em', textDecoration: 'none' }}
      >
        {APP_NAME.toUpperCase()}
      </Link>
      <button
        onClick={onProfileClick}
        className="fp-btn fp-focus rounded-full flex items-center justify-center shrink-0"
        style={{ width: 32, height: 32, background: COLORS.surface, color: COLORS.ink, border: 'none' }}
        aria-label="Open profile"
      >
        <User size={15} />
      </button>
    </div>
  );
}
