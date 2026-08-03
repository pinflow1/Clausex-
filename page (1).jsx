'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { COLORS } from '@/lib/colors';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      setError('This sign-in link is invalid or has expired.');
      return;
    }

    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) email = window.prompt('Confirm the email you used:');

    signInWithEmailLink(auth, email, window.location.href)
      .then(() => {
        window.localStorage.removeItem('emailForSignIn');
        router.replace('/scan');
      })
      .catch(() => setError('That link didn\u2019t work — try requesting a new one.'));
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-5" style={{ background: COLORS.paper }}>
      <p className="text-sm text-center" style={{ color: error ? COLORS.red : COLORS.inkSoft }}>
        {error || 'Signing you in\u2026'}
      </p>
    </div>
  );
}
