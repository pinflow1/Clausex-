'use client';
import { User, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { COLORS } from '@/lib/colors';
import { trialDaysLeft } from '@/lib/tier';
import AuthForm from './AuthForm';
import ScanHistoryList from './ScanHistoryList';

const rowClass = 'flex items-center gap-3 py-3.5 w-full text-left';
const Divider = () => <div style={{ height: 1, background: COLORS.line, margin: '6px 0' }} />;

export default function ProfileMenu({ user, profile, tier }) {
  const tierLabel = { free: 'Free', trial: `Trial · ${trialDaysLeft(profile)}d left`, pro: 'Pro' }[tier];

  const startTrial = async () => {
    const token = await user.getIdToken();
    await fetch('/api/trial/start', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    // No manual refresh needed — useUser's Firestore listener picks this up.
  };

  const upgrade = () => {
    // Paystack checkout lands here next — placeholder until then.
    alert('Pro checkout is coming soon.');
  };

  return (
    <div className="px-5 flex-1 flex flex-col overflow-y-auto">
      <div className="flex items-center gap-3 py-4">
        <div className="rounded-full flex items-center justify-center shrink-0" style={{ width: 44, height: 44, background: COLORS.surface }}>
          <User size={20} color={COLORS.inkSoft} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: COLORS.ink }}>{user ? user.email : 'Guest'}</p>
          <p className="text-xs" style={{ color: COLORS.inkSoft }}>{user ? 'Signed in' : 'Not signed in'}</p>
        </div>
      </div>

      {!user && <AuthForm />}

      <Divider />

      <div className={rowClass}>
        <span className="text-sm flex-1" style={{ color: COLORS.ink }}>Plan</span>
        <span className="text-sm" style={{ color: COLORS.inkSoft }}>{tierLabel}</span>
      </div>

      {user && tier === 'free' && (
        <button onClick={startTrial} className={`${rowClass} fp-link`} style={{ background: 'transparent', border: 'none' }}>
          <span className="text-sm font-semibold flex-1" style={{ color: COLORS.ink }}>Start 5-day free trial</span>
          <ChevronRight size={16} color={COLORS.inkSoft} />
        </button>
      )}
      {user && tier !== 'free' && tier !== 'pro' && (
        <button onClick={upgrade} className={`${rowClass} fp-link`} style={{ background: 'transparent', border: 'none' }}>
          <span className="text-sm font-semibold flex-1" style={{ color: COLORS.ink }}>Upgrade to Pro</span>
          <ChevronRight size={16} color={COLORS.inkSoft} />
        </button>
      )}

      <Divider />

      <p className="text-xs font-semibold pt-1 pb-2" style={{ color: COLORS.inkSoft, letterSpacing: '0.04em' }}>SCAN HISTORY</p>
      <ScanHistoryList user={user} />

      <Divider />
      <div className={rowClass}><Settings size={17} color={COLORS.inkSoft} /><span className="text-sm flex-1" style={{ color: COLORS.ink }}>Settings</span><ChevronRight size={16} color={COLORS.line} /></div>
      <div className={rowClass}><HelpCircle size={17} color={COLORS.inkSoft} /><span className="text-sm flex-1" style={{ color: COLORS.ink }}>Help</span><ChevronRight size={16} color={COLORS.line} /></div>

      <div className="flex-1" />
      <Divider />
      {user && (
        <button onClick={() => signOut(auth)} className={`${rowClass} fp-link`} style={{ background: 'transparent', border: 'none' }}>
          <LogOut size={17} color={COLORS.inkSoft} /><span className="text-sm" style={{ color: COLORS.ink }}>Sign out</span>
        </button>
      )}
    </div>
  );
}
