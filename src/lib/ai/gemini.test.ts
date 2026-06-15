import { describe, it, expect, vi } from 'vitest';

// Mock the GoogleGenAI module to prevent actual API calls during tests
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => {
      return {
        models: {
          generateContent: vi.fn().mockResolvedValue({
            text: JSON.stringify({
              emissions: "Estimated 50 kg CO2e",
              recommendations: ["Test recommendation 1", "Test recommendation 2"]
            })
          })
        }
      };
    })
  };
});

import { performCarbonAudit } from './gemini';

describe('Gemini AI Engine', () => {
  it('should structure the carbon audit response correctly', async () => {
    const mockHabits = "I walk everywhere and eat vegan.";
    const result = await performCarbonAudit(mockHabits);

    expect(result).toBeDefined();
    expect(result).toHaveProperty('emissions');
    expect(result).toHaveProperty('recommendations');
    expect(Array.isArray(result.recommendations)).toBe(true);
    expect(result.emissions).toContain('CO2e');
  });
});
