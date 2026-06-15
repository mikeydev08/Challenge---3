'use client';

import { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import { Card } from '../../components/ui/Card';
import { useAuditStore } from '../../lib/store';

export default function Dashboard() {
  // Get data from global state
  const { emissions, recommendations } = useAuditStore();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi! I'm your CarbonWise Coach. I noticed your transport emissions spiked this week. Would you like some tips on greener commute options?" }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;

    const userText = chatInput;
    // Add user message
    const newMessages = [...messages, { role: 'user', text: userText }];
    setMessages(newMessages);
    setChatInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      setMessages([...newMessages, { role: 'ai', text: data.reply }]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(errorMessage);
      setMessages([...newMessages, { role: 'ai', text: "Error: Could not reach Gemini API. Did you add GEMINI_API_KEY to .env.local?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null; // Prevent hydration error on initial render

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Analytics Dashboard</h1>
      </header>

      <div className={styles.grid}>
        {/* KPI Row */}
        <div className={styles.statsRow}>
          <Card title="Total Emissions (This Month)">
            {emissions ? (
              <p className={styles.statValue} style={{fontSize: '1.5rem'}}>{emissions}</p>
            ) : (
              <p className={styles.statValue} style={{fontSize: '1rem'}}>No Data. Run Audit First.</p>
            )}
          </Card>
          <Card title="Current Streak">
            <p className={styles.statValue}>14 <span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>Days</span></p>
            <p className={styles.statTrend}>Optimization active</p>
          </Card>
          <Card title="Trees Equivalent">
            <p className={styles.statValue}>21 <span style={{fontSize: '1rem', color: 'var(--text-secondary)'}}>Trees</span></p>
            <p className={styles.statTrend}>Offset this year</p>
          </Card>
        </div>

        {/* AI Action Plan / Upcoming Goals */}
        <Card className={styles.actionPlan} title="AI Action Plan">
          {recommendations.length > 0 ? (
            <ul className={styles.goalList}>
              {recommendations.map((rec, idx) => (
                <li key={idx}>
                  <input type="checkbox" id={`goal${idx}`} />
                  <label htmlFor={`goal${idx}`}>{rec}</label>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ color: 'var(--text-secondary)', padding: '1rem' }}>
              No recommendations available yet. Head over to the AI Audit to generate your personalized plan.
            </div>
          )}
        </Card>

        {/* Recent Activities Feed */}
        <Card className={styles.activityFeed} title="Activity Log">
          <div className={styles.feedItem}>
            <span className={styles.feedIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <div className={styles.feedText}>
              <strong>Transport: Car Commute (15km)</strong>
              <span>+3.2 kg CO2e</span>
            </div>
          </div>
          <div className={styles.feedItem}>
            <span className={styles.feedIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"/><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.5-6.9A2 2 0 0017 4h-10c-.8 0-1.5.5-1.8 1.1z"/></svg>
            </span>
            <div className={styles.feedText}>
              <strong>Food: Vegan Lunch</strong>
              <span className={styles.positive}>-1.5 kg CO2e</span>
            </div>
          </div>
          <div className={styles.feedItem}>
            <span className={styles.feedIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </span>
            <div className={styles.feedText}>
              <strong>Energy: Grid Sync</strong>
              <span>+45 kg CO2e</span>
            </div>
          </div>
        </Card>

        {/* Emissions Breakdown Chart (Mock) */}
        <Card className={styles.mainChart} title="Emissions Breakdown">
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'}}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'conic-gradient(#ffffff 0% 45%, #3b82f6 45% 75%, #94a3b8 75% 100%)', margin: '0 auto 1.5rem', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}></div>
              <p>Transport (45%) • Energy (30%) • Food (25%)</p>
            </div>
          </div>
        </Card>

        {/* AI Coach Chat Widget */}
        <Card className={styles.aiCoach} title="AI Sustainability Coach">
          <div className={styles.chatBox}>
            <div className={styles.messages}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.message} ${msg.role === 'ai' ? styles.ai : styles.user}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className={styles.inputArea}>
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about reducing operational emissions..." 
                className={styles.input}
              />
              <button type="submit" className={styles.sendBtn}>Send</button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
