// Both providers occasionally wrap JSON in ```json fences despite being
// told not to. Strip those before parsing, and surface the raw text on
// failure so the API route can return it for debugging instead of just
// a generic 500.
export function parseModelJSON(raw) {
  const cleaned = raw.replace(/```json|```/g, '').trim();
  try {
    return { data: JSON.parse(cleaned), error: null };
  } catch (err) {
    return { data: null, error: 'Model response was not valid JSON', raw: cleaned };
  }
}
