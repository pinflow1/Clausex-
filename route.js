import { NextResponse } from 'next/server';
import { runHybrid } from '@/lib/llm';
import { DETECT_SYSTEM_PROMPT } from '@/lib/prompts';
import { DETECT_CHARS } from '@/lib/constants';

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { text = '', image = null } = body;
  const promptText = text
    ? text.slice(0, DETECT_CHARS)
    : 'What type of app or service is this document for?';

  if (!text && !image) {
    return NextResponse.json({ error: 'Provide text or an image' }, { status: 400 });
  }

  try {
    const { raw } = await runHybrid({ systemPrompt: DETECT_SYSTEM_PROMPT, text: promptText, image });
    const label = raw.trim().replace(/["'.]/g, '').slice(0, 40);
    return NextResponse.json({ label });
  } catch (err) {
    // Detection is a nice-to-have — fail quietly with a 200 and empty label
    // rather than surfacing an error toast for something this minor.
    return NextResponse.json({ label: '' });
  }
}
