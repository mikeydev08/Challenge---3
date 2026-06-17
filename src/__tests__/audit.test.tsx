import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuditPage from '../app/audit/page';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the global fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      emissions: "Estimated 100 kg CO2e",
      recommendations: ["Test recommendation"]
    })
  })
) as import('vitest').Mock;

describe('AI Carbon Audit Component', () => {
  beforeEach(() => {
    (global.fetch as import('vitest').Mock).mockClear();
  });

  it('renders the audit form properly', () => {
    render(<AuditPage />);
    expect(screen.getByRole('heading', { name: /AI Carbon Audit/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/E.g., I travel/i)).toBeInTheDocument();
  });

  it('disables the submit button when input is empty', () => {
    render(<AuditPage />);
    const button = screen.getByRole('button', { name: /Generate AI Audit/i });
    expect(button).toBeDisabled();
  });

  it('calls the Gemini API route upon submission and displays results', async () => {
    render(<AuditPage />);
    const input = screen.getByPlaceholderText(/E.g., I travel/i);
    const button = screen.getByRole('button', { name: /Generate AI Audit/i });

    // User types in habits
    fireEvent.change(input, { target: { value: 'I ride a bike everywhere' } });
    expect(button).not.toBeDisabled();

    // User submits the form
    fireEvent.click(button);

    // Wait for the mock API response to be rendered
    await waitFor(() => {
      expect(screen.getByText('Audit Complete!')).toBeInTheDocument();
      expect(screen.getByText('Estimated 100 kg CO2e')).toBeInTheDocument();
      expect(screen.getByText('Test recommendation')).toBeInTheDocument();
    });

    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith('/api/audit', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ habits: 'I ride a bike everywhere' })
    }));
  });
});
