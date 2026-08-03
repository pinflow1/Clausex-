import { adminDb } from './firebase/admin';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 8; // per key, per window - generous for real use, painful to abuse

export function getClientIp(req) {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

// key = `user_<uid>` for signed-in requests, `ip_<address>` otherwise.
// A transaction keeps this correct even if two requests from the same
// key land on different serverless instances at nearly the same time.
export async function checkRateLimit(key) {
  const safeId = key.replace(/[^a-zA-Z0-9_-]/g, '_');
  const ref = adminDb().collection('rate_limits').doc(safeId);
  const now = Date.now();

  return adminDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);

    if (!snap.exists || now - snap.data().windowStart > WINDOW_MS) {
      tx.set(ref, { count: 1, windowStart: now });
      return { allowed: true };
    }

    const data = snap.data();
    if (data.count >= MAX_REQUESTS) {
      const retryAfterMin = Math.ceil((WINDOW_MS - (now - data.windowStart)) / 60000);
      return { allowed: false, retryAfterMin };
    }

    tx.update(ref, { count: data.count + 1 });
    return { allowed: true };
  });
}
