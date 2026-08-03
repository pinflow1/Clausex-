'use client';
import { X } from 'lucide-react';
import { COLORS } from '@/lib/colors';
import ProfileMenu from './ProfileMenu';

export default function ProfilePanel({ open, onClose, user, profile, tier }) {
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(26,25,16,0.45)', opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.25s ease' }}
      />
      <div
        className="fixed top-0 right-0 h-full z-50 overflow-y-auto flex flex-col"
        style={{
          width: 300,
          maxWidth: '85vw',
          background: COLORS.paper,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: open ? '-10px 0 30px rgba(20,19,15,0.15)' : 'none',
        }}
      >
        <div className="px-3 pt-4">
          <button onClick={onClose} className="fp-link rounded-full flex items-center justify-center" style={{ width: 32, height: 32, background: 'transparent', border: 'none', color: COLORS.inkSoft }} aria-label="Close profile">
            <X size={18} />
          </button>
        </div>
        <ProfileMenu user={user} profile={profile} tier={tier} />
      </div>
    </>
  );
}
