import { adminAuth } from './admin';

// Client sends `Authorization: Bearer <idToken>` (from user.getIdToken()).
// Returns the verified uid, or null if missing/invalid/expired — callers
// decide whether that means "treat as signed out" or "reject the request".
export async function getUidFromRequest(req) {
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;

  try {
    const decoded = await adminAuth().verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}
