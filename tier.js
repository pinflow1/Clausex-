export const TRIAL_DAYS = 5;

// Firestore gives back Timestamp objects (with .toDate()) via the client
// SDK, but plain JS Dates via the Admin SDK depending on the call site —
// handle both so this doesn't silently break depending on where it's read.
function toDate(value) {
  if (!value) return null;
  if (typeof value.toDate === 'function') return value.toDate();
  return new Date(value);
}

// A stored tier of 'trial' doesn't mean much on its own — it needs to be
// checked against trial_started_at every time, since nothing flips it back
// to 'free' automatically when the 5 days run out.
export function getEffectiveTier(profile) {
  if (!profile) return 'free';
  if (profile.tier === 'pro') return 'pro';

  const started = toDate(profile.trial_started_at);
  if (profile.tier === 'trial' && started) {
    const elapsedDays = (Date.now() - started.getTime()) / (1000 * 60 * 60 * 24);
    return elapsedDays < TRIAL_DAYS ? 'trial' : 'free';
  }

  return 'free';
}

export function trialDaysLeft(profile) {
  const started = toDate(profile?.trial_started_at);
  if (!started) return 0;
  const elapsedDays = (Date.now() - started.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(TRIAL_DAYS - elapsedDays));
}
