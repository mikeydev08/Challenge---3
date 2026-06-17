/**
 * CarbonWise AI - API Client
 *
 * Centralised service layer for all network requests.
 * Keeps React components free of fetch logic and provides
 * strict TypeScript types for every API response.
 */

/** Shape returned by the /api/audit endpoint. */
export interface AuditResponse {
  emissions: string;
  recommendations: string[];
  error?: string;
}

/** Shape returned by the /api/coach endpoint. */
export interface CoachResponse {
  reply: string;
  error?: string;
}

/**
 * Maximum character lengths enforced client-side
 * (mirrors the server-side limits in the API routes).
 */
const MAX_AUDIT_LENGTH = 2000;
const MAX_COACH_LENGTH = 500;

/**
 * Thin, typed wrapper around the CarbonWise REST API.
 *
 * Every method validates inputs client-side before sending
 * the request and throws a descriptive `Error` on failure.
 */
export const API = {
  /**
   * Submit lifestyle habits and receive AI-generated carbon
   * footprint analysis from the Gemini-powered audit engine.
   *
   * @param habits - Free-text description of daily habits (max 2 000 chars).
   * @returns Structured audit data with emissions summary and recommendations.
   * @throws {Error} When the network request fails or the server returns an error.
   */
  async generateAudit(habits: string): Promise<AuditResponse> {
    if (!habits.trim()) throw new Error('Habits description must not be empty.');
    if (habits.length > MAX_AUDIT_LENGTH) {
      throw new Error(`Input exceeds the maximum length of ${MAX_AUDIT_LENGTH} characters.`);
    }

    const res = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habits }),
    });

    const data: AuditResponse = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Failed to generate audit.');
    return data;
  },

  /**
   * Send a user message to the AI Sustainability Coach and
   * receive a conversational reply powered by Gemini Flash.
   *
   * @param message - The user's chat message (max 500 chars).
   * @returns The coach's reply text.
   * @throws {Error} When the network request fails or the server returns an error.
   */
  async chatWithCoach(message: string): Promise<CoachResponse> {
    if (!message.trim()) throw new Error('Message must not be empty.');
    if (message.length > MAX_COACH_LENGTH) {
      throw new Error(`Message exceeds the maximum length of ${MAX_COACH_LENGTH} characters.`);
    }

    const res = await fetch('/api/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data: CoachResponse = await res.json();
    if (!res.ok) throw new Error(data.error ?? 'Failed to fetch response.');
    return data;
  },
};
