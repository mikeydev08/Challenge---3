import { GoogleGenAI } from '@google/genai';

/**
 * Lazily initialises the Google GenAI client.
 *
 * The client is created on first call rather than at module scope
 * so that Vercel's static build phase never reads env vars that
 * don't yet exist during compilation.
 *
 * Supports both standard API-key auth and Google Cloud Vertex AI.
 */
const getAIClient = (): GoogleGenAI => {
  return new GoogleGenAI(
    process.env.GEMINI_API_KEY
      ? { apiKey: process.env.GEMINI_API_KEY }
      : {
          vertexai: true,
          project: process.env.GOOGLE_CLOUD_PROJECT_ID || 'dummy-project',
          location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
        },
  );
};

/**
 * Conducts the AI Carbon Audit using Gemini 2.5 Flash.
 *
 * The model is prompted with a strict JSON schema so the front-end
 * can reliably parse the result without additional transformations.
 *
 * @param userHabits - A free-text description of the user's daily habits.
 * @returns A parsed JSON object containing `emissions` and `recommendations`.
 * @throws {Error} When the Gemini API returns no text or an invalid response.
 */
export async function performCarbonAudit(
  userHabits: string,
): Promise<{ emissions: string; recommendations: string[] }> {
  const ai = getAIClient();

  const prompt = `
You are CarbonWise AI, an expert sustainability coach.
Analyze the following user lifestyle habits and calculate their carbon footprint.

User Habits: "${userHabits}"

Respond strictly in the following JSON format ONLY:
{
  "emissions": "A short summary string of their estimated total carbon footprint (in kg CO2e) and categories",
  "recommendations": [
    "String recommendation 1",
    "String recommendation 2",
    "String recommendation 3"
  ]
}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });

  const text = response.text;
  if (!text) throw new Error('No response received from Gemini.');

  return JSON.parse(text) as { emissions: string; recommendations: string[] };
}

/**
 * Chat with the AI Sustainability Coach using Gemini 2.5 Flash.
 *
 * The coach provides concise, actionable sustainability advice
 * in a friendly, encouraging tone.
 *
 * @param userMessage - The user's chat message.
 * @returns A plain-text reply from the coach.
 * @throws {Error} When the Gemini API is unreachable or returns no text.
 */
export async function chatWithCoach(userMessage: string): Promise<string> {
  const ai = getAIClient();

  const prompt = `
You are CarbonWise AI, an expert, friendly sustainability coach.
Respond to the user's message concisely in 1-2 sentences.
Provide actionable, encouraging advice regarding carbon footprint reduction if applicable.

User Message: "${userMessage}"
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text || "I'm sorry, I couldn't process that right now.";
}
