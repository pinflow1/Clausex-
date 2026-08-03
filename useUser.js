'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import { getEffectiveTier } from '@/lib/tier';

export default function useUser() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Picks up the result if we're loading right after a Google redirect.
    // onAuthStateChanged below fires regardless once Firebase processes
    // it — this call mainly exists to surface a redirect-specific error.
    getRedirectResult(auth).catch(() => {});

    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    // Live listener — trial/tier changes (e.g. right after checkout)
    // reflect instantly with no manual refresh needed.
    return onSnapshot(doc(db, 'profiles', user.uid), (snap) => {
      setProfile(snap.exists() ? snap.data() : null);
    });
  }, [user]);

  return { user, profile, loading, tier: getEffectiveTier(profile) };
}
