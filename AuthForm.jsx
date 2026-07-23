'use client';
import { useState } from 'react';
import { sendSignInLinkToEmail, signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/client';
import { COLORS } from '@/lib/colors';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const sendLink = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendSignInLinkToEmail(auth, email, {
        url: `${window.location.origin}/auth/callback`,
        handleCodeInApp: true,
      });
      window.localStorage.setItem('emailForSignIn', email);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  // Redirect rather than popup — popups get silently blocked in a lot of
  // mobile in-app browsers (Threads, Instagram, etc.), which is exactly
  // where people will be clicking in from.
  const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);

  if (status === 'sent') {
    return <p className="text-xs py-2" style={{ color: COLORS.inkSoft }}>Check {email} for a sign-in link.</p>;
  }

  return (
    <div className="py-2">
      <button
        onClick={signInWithGoogle}
        className="fp-btn w-full rounded-full text-sm font-semibold mb-2"
        style={{ background: COLORS.paper, color: COLORS.ink, border: `1px solid ${COLORS.line}`, padding: '9px 0' }}
      >
        Continue with Google
      </button>
      <div className="flex items-center gap-2 my-3">
        <div style={{ flex: 1, height: 1, background: COLORS.line }} />
        <span className="text-xs" style={{ color: COLORS.inkSoft }}>or</span>
        <div style={{ flex: 1, height: 1, background: COLORS.line }} />
      </div>
      <form onSubmit={sendLink}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="fp-input w-full rounded-full text-sm mb-2"
          style={{ background: COLORS.surface, color: COLORS.ink, border: 'none', padding: '8px 14px' }}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="fp-btn w-full rounded-full text-sm font-semibold"
          style={{ background: COLORS.ink, color: '#FFFFFF', border: 'none', padding: '9px 0' }}
        >
          {status === 'sending' ? 'Sending…' : 'Send sign-in link'}
        </button>
        {status === 'error' && <p className="text-xs mt-2" style={{ color: COLORS.red }}>Couldn't send the link — try again.</p>}
      </form>
    </div>
  );
}
