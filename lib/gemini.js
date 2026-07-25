// Server-side only. Never import this from a client component —
// GEMINI_API_KEY must not reach the browser.

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

function buildParts(text, image) {
  const parts = [];
  if (image) {
    parts.push({ inlineData: { mimeType: image.mediaType, data: image.base64 } });
  }
  parts.push({ text });
  return parts;
}

export async function callGemini({ systemPrompt, text, image }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: buildParts(text, image) }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const out = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('') || '';
  if (!out) throw new Error('Gemini returned no text');
  return out;
}
