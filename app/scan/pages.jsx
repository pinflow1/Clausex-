'use client';
import { useState } from 'react';
import { COLORS } from '@/lib/colors';
import useScanEngine from '@/hooks/useScanEngine';
import useUser from '@/hooks/useUser';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import ResultsView from '@/components/ResultsView';
import InputArea from '@/components/InputArea';
import ProfilePanel from '@/components/ProfilePanel';

export default function Page() {
  const engine = useScanEngine();
  const { user, profile, tier } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const hasStarted = engine.loading || !!engine.result || !!engine.error;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: COLORS.paper }}>
      <Header onProfileClick={() => setProfileOpen(true)} />

      <div className={`max-w-2xl mx-auto w-full px-5 flex-1 flex flex-col ${!hasStarted ? 'justify-center' : 'pt-6'}`} style={{ paddingBottom: 130 }}>
        {!hasStarted && (
          <>
            <Hero />
            <HowItWorks />
          </>
        )}
        {hasStarted && (
          <ResultsView engine={engine} tier={tier} userEmail={user?.email} onUnlockClick={() => setProfileOpen(true)} />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10" style={{ background: COLORS.paper, borderTop: `1px solid ${COLORS.line}` }}>
        <div className="max-w-2xl mx-auto w-full px-5 py-3">
          <InputArea engine={engine} />
        </div>
      </div>

      <ProfilePanel
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        profile={profile}
        tier={tier}
      />
    </div>
  );
}
