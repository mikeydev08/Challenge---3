import { describe, it, expect, vi, beforeEach } from 'vitest';
import { API } from './apiClient';

describe('API Client – generateAudit', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('throws when habits string is empty', async () => {
    await expect(API.generateAudit('')).rejects.toThrow('must not be empty');
  });

  it('throws when habits exceed maximum length', async () => {
    const longString = 'a'.repeat(2001);
    await expect(API.generateAudit(longString)).rejects.toThrow('maximum length');
  });

  it('returns parsed audit data on success', async () => {
    const mockResponse = {
      emissions: 'Estimated 120 kg CO2e',
      recommendations: ['Walk more', 'Eat less meat'],
    };

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    }));

    const result = await API.generateAudit('I drive 20km daily');
    expect(result.emissions).toBe('Estimated 120 kg CO2e');
    expect(result.recommendations).toHaveLength(2);
  });

  it('throws on server error response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Server is busy' }),
    }));

    await expect(API.generateAudit('test')).rejects.toThrow('Server is busy');
  });
});

describe('API Client – chatWithCoach', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('throws when message is empty', async () => {
    await expect(API.chatWithCoach('  ')).rejects.toThrow('must not be empty');
  });

  it('returns coach reply on success', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ reply: 'Try cycling!' }),
    }));

    const result = await API.chatWithCoach('How to reduce emissions?');
    expect(result.reply).toBe('Try cycling!');
  });
});
