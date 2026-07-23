import { NextResponse } from 'next/server';
import { getUidFromRequest } from '@/lib/firebase/verifyToken';
import { adminDb } from '@/lib/firebase/admin';

export async function GET(req) {
  const uid = await getUidFromRequest(req);
  if (!uid) {
    return NextResponse.json({ scans: [] });
  }

  // Needs a composite index (user_id ==, created_at desc) — Firestore will
  // error with a direct link to create it the first time this runs.
  const snap = await adminDb()
    .collection('scans')
    .where('user_id', '==', uid)
    .orderBy('created_at', 'desc')
    .limit(20)
    .get();

  const scans = snap.docs.map((d) => {
    const v = d.data();
    return { id: d.id, headline: v.headline, overall_grade: v.overall_grade, overall_score: v.overall_score, category: v.category };
  });

  return NextResponse.json({ scans });
}
