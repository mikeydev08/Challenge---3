import { describe, it, expect, vi } from 'vitest';

// Mock the GoogleGenAI module to prevent actual API calls during tests
vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn().mockImplementation(() => ({
    models: {
      generateContent: vi.fn().mockResolvedValue({
        text: JSON.stringify({
          emissions: 'Estimated 50 kg CO2e per month across transport and food',
          recommendations: [
            'Switch to cycling for short commutes under 5 km',
            'Replace one beef meal per week with a plant-based alternative',
          ],
        }),
      }),
    },
  })),
}));

import { performCarbonAudit, chatWithCoach } from './gemini';

describe('Gemini AI Engine – performCarbonAudit', () => {
  it('returns structured emissions data and recommendations', async () => {
    const result = await performCarbonAudit('I walk everywhere and eat vegan.');

    expect(result).toBeDefined();
    expect(result).toHaveProperty('emissions');
    expect(result).toHaveProperty('recommendations');
    expect(Array.isArray(result.recommendations)).toBe(true);
    expect(result.recommendations.length).toBeGreaterThan(0);
    expect(result.emissions).toContain('CO2e');
  });
});

describe('Gemini AI Engine – chatWithCoach', () => {
  it('returns a non-empty string reply', async () => {
    // Re-mock for coach to return plain text
    const { GoogleGenAI } = await import('@google/genai');
    (GoogleGenAI as unknown as ReturnType<typeof vi.fn>).mockImplementation(() => ({
      models: {
        generateContent: vi.fn().mockResolvedValue({
          text: 'Consider biking to work twice a week to cut emissions by 20%.',
        }),
      },
    }));

    const reply = await chatWithCoach('How can I reduce my carbon footprint?');
    expect(typeof reply).toBe('string');
    expect(reply.length).toBeGreaterThan(0);
  });
});
