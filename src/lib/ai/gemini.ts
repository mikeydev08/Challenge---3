import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client. We support either standard API Key or Vertex AI.
const ai = new GoogleGenAI(
  process.env.GEMINI_API_KEY 
    ? { apiKey: process.env.GEMINI_API_KEY } 
    : {
        vertexai: true,
        project: process.env.GOOGLE_CLOUD_PROJECT_ID as string,
        location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
      }
);

/**
 * Conducts the AI Carbon Audit using Gemini 2.5 Pro for deep reasoning.
 * @param userHabits A raw text description of the user's habits
 * @returns Structured JSON containing footprint estimate and recommendations
 */
export async function performCarbonAudit(userHabits: string) {
  try {
    const prompt = `
    You are CarbonWise AI, an expert sustainability coach.
    Analyze the following user lifestyle habits and provide:
    1. Estimated carbon footprint (in kg CO2e) categorized by transport, energy, food, etc.
    2. 3 highly personalized, actionable recommendations to reduce emissions.
    
    User Habits: "${userHabits}"
    
    Respond strictly in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    }
  });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text);
  } catch (error) {
    console.error("Carbon Audit Error:", error);
    throw error;
  }
}

/**
 * Chat with the AI Sustainability Coach using Gemini 2.5 Flash.
 */
export async function chatWithCoach(userMessage: string) {
  try {
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
  } catch (error) {
    console.error("AI Coach Error:", error);
    throw error;
  }
}
