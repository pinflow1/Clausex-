// Server-side only, used as failover when Gemini errors or is rate-limited.
// Groq's model lineup changes often — check console.groq.com/docs/models
// if either default below has been retired.

const TEXT_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const VISION_MODEL = process.env.GROQ_VISION_MODEL || 'qwen/qwen3.6-27b';

function buildContent(text, image) {
  if (!image) return text;
  return [
    { type: 'text', text },
    { type: 'image_url', image_url: { url: `data:${image.mediaType};base64,${image.base64}` } },
  ];
}

export async function callGroq({ systemPrompt, text, image }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not set');

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: image ? VISION_MODEL : TEXT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: buildContent(text, image) },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Groq ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const out = data?.choices?.[0]?.message?.content || '';
  if (!out) throw new Error('Groq returned no text');
  return out;
}
