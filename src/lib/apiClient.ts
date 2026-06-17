export interface AuditResponse {
  emissions?: string;
  recommendations?: string[];
  error?: string;
}

export interface CoachResponse {
  reply?: string;
  error?: string;
}

export const API = {
  async generateAudit(habits: string): Promise<AuditResponse> {
    const res = await fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habits })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to generate audit');
    return data;
  },

  async chatWithCoach(message: string): Promise<CoachResponse> {
    const res = await fetch('/api/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch response');
    return data;
  }
};
