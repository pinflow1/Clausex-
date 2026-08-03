import { NextResponse } from 'next/server';
import { getUidFromRequest } from '@/lib/firebase/verifyToken';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req) {
  const uid = await getUidFromRequest(req);
  if (!uid) {
    return NextResponse.json({ error: 'Sign in first' }, { status: 401 });
  }

  const ref = adminDb().collection('profiles').doc(uid);
  const snap = await ref.get();

  if (snap.exists && snap.data().tier === 'pro') {
    return NextResponse.json({ error: 'Already on Pro' }, { status: 400 });
  }

  // .set with merge:true also handles the first-ever write for a brand
  // new user — no separate "create profile on signup" step needed.
  await ref.set({ tier: 'trial', trial_started_at: new Date() }, { merge: true });

  return NextResponse.json({ ok: true });
}
