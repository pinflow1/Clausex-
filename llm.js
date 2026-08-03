import { callGemini } from './gemini';
import { callGroq } from './groq';

// Tries Gemini first (primary — better reasoning, native vision).
// Falls back to Groq only if Gemini throws (rate limit, outage, bad key).
// Returns which engine actually served the request so the UI can show
// a "running on fast mode" style notice when we've fallen back.
export async function runHybrid({ systemPrompt, text, image }) {
  try {
    const raw = await callGemini({ systemPrompt, text, image });
    return { raw, engine: 'gemini' };
  } catch (geminiError) {
    try {
      const raw = await callGroq({ systemPrompt, text, image });
      return { raw, engine: 'groq', fellBackFrom: String(geminiError.message || geminiError) };
    } catch (groqError) {
      throw new Error(
        `Both providers failed. Gemini: ${geminiError.message || geminiError}. Groq: ${groqError.message || groqError}`
      );
    }
  }
}
