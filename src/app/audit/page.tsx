'use client';

import { useState, useCallback } from 'react';
import styles from './audit.module.css';
import { useAuditStore } from '../../lib/store';
import { API, type AuditResponse } from '../../lib/apiClient';

/**
 * AI Carbon Audit page.
 *
 * Users enter a free-text description of their daily habits and
 * receive a Gemini-powered carbon footprint analysis with
 * personalised reduction strategies.
 */
export default function AuditPage() {
  const [habits, setHabits] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResponse | null>(null);

  const setGlobalAuditData = useAuditStore((state) => state.setAuditData);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!habits.trim()) return;

      setIsLoading(true);
      setResult(null);

      try {
        const data = await API.generateAudit(habits);

        if (!data.recommendations) {
          setResult({
            emissions: 'Estimated 120 kg CO2e per month',
            recommendations: [
              'Ensure your API Key is configured in .env.local to get real AI responses!',
            ],
          });
        } else {
          setResult(data);
          setGlobalAuditData(data.emissions, data.recommendations);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        alert(
          `Error: ${errorMessage}\n\nMake sure your GEMINI_API_KEY is configured in .env.local!`,
        );
      } finally {
        setIsLoading(false);
      }
    },
    [habits, setGlobalAuditData],
  );

  return (
    <main className={styles.container} aria-label="AI Carbon Audit Interface">
      <header className={styles.header}>
        <div className={styles.badge}>Analysis Engine</div>
        <h1 className={styles.title}>Carbon Intelligence Audit</h1>
        <p className={styles.subtitle}>
          Provide parameters regarding your daily operational and commuting habits.
          Our LLM pipeline will calculate your footprint.
        </p>
      </header>

      <div className={styles.contentGrid}>
        {/* Left Column: Input Form */}
        <div className={styles.leftColumn}>
          <section
            className={`${styles.form} saasCard`}
            aria-labelledby="audit-form-title"
          >
            <h2 id="audit-form-title" className="sr-only">
              Audit Input Form
            </h2>

            {/* Quick Fill Chips */}
            <div className={styles.quickFillContainer}>
              <p className={styles.quickFillLabel}>Quick Test Prompts:</p>
              <div className={styles.quickFillChips} role="group" aria-label="Quick-fill profile buttons">
                <button
                  type="button"
                  className={styles.chip}
                  onClick={() =>
                    setHabits(
                      'I commute 20km daily by gas car, eat beef 4 times a week, and run the AC all night.',
                    )
                  }
                >
                  Heavy Commuter Profile
                </button>
                <button
                  type="button"
                  className={styles.chip}
                  onClick={() =>
                    setHabits(
                      'I work from home, eat a strict vegan diet, and use solar panels for electricity.',
                    )
                  }
                >
                  Low-Impact Profile
                </button>
                <button
                  type="button"
                  className={styles.chip}
                  onClick={() =>
                    setHabits(
                      'I travel 10 Km with cycle, eat chicken twice a week, and use public transit.',
                    )
                  }
                >
                  Urban Cyclist Profile
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="habits-input" className="sr-only">
                Describe your habits
              </label>
              <textarea
                id="habits-input"
                className={styles.textarea}
                value={habits}
                onChange={(e) => setHabits(e.target.value)}
                placeholder="E.g., I travel 15 km daily by scooter, use AC for 5 hours, and order food online twice a week..."
                required
                aria-required="true"
              />
              <button
                type="submit"
                className={styles.button}
                disabled={isLoading || !habits.trim()}
                aria-busy={isLoading}
              >
                {isLoading ? 'Analyzing with Gemini...' : 'Generate AI Audit'}
              </button>
            </form>
          </section>
        </div>

        {/* Right Column: AI Results / Status */}
        <div className={styles.rightColumn} aria-live="polite" aria-atomic="true">
          {!result && !isLoading && (
            <div className={`${styles.emptyState} saasCard`}>
              <div className={styles.emptyIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h3>System Standing By</h3>
              <p>
                Enter your operational parameters on the left. The inference
                engine will generate a detailed analysis.
              </p>
            </div>
          )}

          {isLoading && (
            <div className={`${styles.loadingState} saasCard`} role="status">
              <div className={styles.spinner} />
              <h3>Processing Multimodal Data...</h3>
              <p>Gemini is categorizing your activities and calculating emissions.</p>
            </div>
          )}

          {result && !isLoading && (
            <section
              className={`${styles.result} saasCard`}
              aria-labelledby="result-title"
            >
              <h2 id="result-title" className={styles.resultTitle}>
                Audit Complete
              </h2>
              <div className={styles.emissionsHighlight}>
                <span className={styles.emissionsValue}>{result.emissions}</span>
              </div>

              <h3 style={{ marginTop: '1.5rem', color: 'var(--text-main)' }}>
                Optimization Strategies:
              </h3>
              <ul className={styles.recommendationList}>
                {result.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
