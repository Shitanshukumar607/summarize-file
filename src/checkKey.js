export async function checkKey() {
  const gemini = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const openai = process.env.OPENAI_API_KEY;

  if (gemini) return { type: "gemini", key: gemini };
  if (openai) return { type: "openai", key: openai };

  return { type: null, key: null };
}
