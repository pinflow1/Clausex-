import { NextResponse } from 'next/server';
import { runHybrid } from '@/lib/llm';
import { parseModelJSON } from '@/lib/parseResponse';
import { SCAN_SYSTEM_PROMPT } from '@/lib/prompts';
import { MAX_CHARS } from '@/lib/constants';
import { getUidFromRequest } from '@/lib/firebase/verifyToken';
import { adminDb } from '@/lib/firebase/admin';

async function saveScan(uid, category, data) {
  if (!uid) return; // signed-out users can still scan, just nothing to save to
  await adminDb().collection('scans').add({
    user_id: uid,
    headline: data.headline || null,
    overall_grade: data.overall_grade || null,
    overall_score: data.overall_score ?? null,
    category: category.trim() || null,
    result: data,
    created_at: new Date(),
  });
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { text = '', image = null, category = '' } = body;
  const trimmed = text.trim().slice(0, MAX_CHARS);

  if (!trimmed && !image) {
    return NextResponse.json({ error: 'Provide text or an image to scan' }, { status: 400 });
  }

  const contextLine = category.trim() ? `Service category: "${category.trim()}"\n\n` : '';
  const promptText = contextLine + (trimmed || 'Analyze the terms of service or privacy policy shown in this image.');

  try {
    const { raw, engine, fellBackFrom } = await runHybrid({
      systemPrompt: SCAN_SYSTEM_PROMPT,
      text: promptText,
      image,
    });

    const { data, error, raw: rawOnFail } = parseModelJSON(raw);
    if (error) {
      return NextResponse.json({ error, raw: rawOnFail }, { status: 502 });
    }

    const uid = await getUidFromRequest(req);
    await saveScan(uid, category, data);

    return NextResponse.json({ result: data, engine, fellBackFrom: fellBackFrom || null });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Scan failed' }, { status: 502 });
  }
}
