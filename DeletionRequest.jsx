'use client';
import { useState } from 'react';
import { Mail, Lock, Copy, Check, ShieldCheck } from 'lucide-react';
import { COLORS } from '@/lib/colors';
import { buildDeletionEmail } from '@/lib/deletionEmail';

export default function DeletionRequest({ result, tier, userEmail, onUnlockClick, delay }) {
  const [signedUp, setSignedUp] = useState(null); // null = unanswered, then true/false
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  if (!result?.service_name) return null;

  const email = buildDeletionEmail({
    serviceName: result.service_name,
    contactEmail: result.contact_email,
    userEmail,
    userName: name,
  });

  const copyBody = async () => {
    await navigator.clipboard.writeText(`${email.subject}\n\n${email.body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fp-reveal" style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-center gap-2 mb-2 px-1">
        <p className="text-xs font-semibold" style={{ color: COLORS.inkSoft, letterSpacing: '0.04em' }}>
          DONE WITH {result.service_name.toUpperCase()}?
        </p>
        <span className="text-xs font-semibold rounded-full" style={{ background: COLORS.ink, color: COLORS.lime, padding: '1px 9px' }}>PRO</span>
      </div>

      {tier === 'free' && (
        <button onClick={onUnlockClick} className="fp-link w-full rounded-2xl p-4 flex items-center gap-3 text-left" style={{ background: COLORS.surface, border: `1px dashed ${COLORS.line}` }}>
          <Lock size={16} color={COLORS.inkSoft} className="shrink-0" />
          <span className="flex-1 text-sm font-semibold" style={{ color: COLORS.ink }}>Get a ready-to-send deletion request</span>
        </button>
      )}

      {tier !== 'free' && signedUp === null && (
        <div className="rounded-2xl p-4" style={{ background: COLORS.surface }}>
          <p className="text-sm font-semibold mb-3" style={{ color: COLORS.ink }}>
            Do you already have an account with {result.service_name}?
          </p>
          <div className="flex gap-2">
            <button onClick={() => setSignedUp(true)} className="fp-btn flex-1 rounded-full text-sm font-semibold" style={{ background: COLORS.ink, color: '#FFFFFF', border: 'none', padding: '9px 0' }}>
              Yes, I'm signed up
            </button>
            <button onClick={() => setSignedUp(false)} className="fp-btn flex-1 rounded-full text-sm font-semibold" style={{ background: COLORS.paper, color: COLORS.ink, border: `1px solid ${COLORS.line}`, padding: '9px 0' }}>
              No, just checking
            </button>
          </div>
        </div>
      )}

      {tier !== 'free' && signedUp === false && (
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: COLORS.surface }}>
          <ShieldCheck size={18} color={COLORS.lime} className="shrink-0" />
          <p className="text-xs" style={{ color: COLORS.inkSoft }}>
            Good — nothing to delete yet. This stays here if you sign up later and change your mind.
          </p>
        </div>
      )}

      {tier !== 'free' && signedUp === true && (
        <div className="rounded-2xl p-4" style={{ background: COLORS.surface }}>
          <p className="text-xs mb-3" style={{ color: COLORS.inkSoft }}>
            Drafted a data-deletion request for {result.service_name}. It opens in your own email app — we never contact companies on your behalf.
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (goes in the sign-off)"
            className="fp-input w-full rounded-full text-xs mb-3"
            style={{ background: COLORS.paper, color: COLORS.ink, border: 'none', padding: '7px 12px' }}
          />
          {!email.hasContact && (
            <p className="text-xs mb-3" style={{ color: COLORS.orange }}>
              No contact email found in the document — add the recipient yourself before sending.
            </p>
          )}
          <div className="flex gap-2">
            <a href={email.mailto} className="fp-btn flex-1 rounded-full text-sm font-semibold flex items-center justify-center gap-1.5" style={{ background: COLORS.ink, color: '#FFFFFF', padding: '9px 0', textDecoration: 'none' }}>
              <Mail size={14} /> Open in Mail
            </a>
            <button onClick={copyBody} className="fp-btn rounded-full flex items-center justify-center" style={{ width: 38, background: COLORS.paper, border: `1px solid ${COLORS.line}` }} aria-label="Copy email text">
              {copied ? <Check size={15} color={COLORS.lime} /> : <Copy size={15} color={COLORS.inkSoft} />}
            </button>
          </div>
          <button onClick={() => setSignedUp(null)} className="fp-link text-xs mt-3" style={{ color: COLORS.inkSoft, background: 'none', border: 'none' }}>
            ← back
          </button>
        </div>
      )}
    </div>
  );
}
