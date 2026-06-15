import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container} aria-label="CarbonWise AI Landing Page">
      {/* Hero Section */}
      <section className={`${styles.hero} ${styles.saasSection}`} aria-labelledby="hero-title">
        <div className={styles.heroContent}>
          <div className={styles.badge}>CarbonWise v2.0</div>
          <h1 id="hero-title" className={styles.title}>Enterprise Sustainability Intelligence</h1>
          <p className={styles.subtitle}>
            Unify your carbon tracking, predictive modeling, and reduction strategies into a single, high-performance platform powered by Google Gemini.
          </p>
          <nav className={styles.actions} aria-label="Main navigation actions">
            <a href="/audit" className={`${styles.button} ${styles.primary}`} aria-label="Start your AI Carbon Audit">
              Start AI Audit
            </a>
            <a href="/dashboard" className={`${styles.button} ${styles.secondary}`} aria-label="View your Carbon Dashboard">
              View Dashboard
            </a>
          </nav>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className={styles.featuresSection} aria-labelledby="features-title">
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3>Intelligent Tracking</h3>
            <p>Log your habits effortlessly and let our models analyze your real-time carbon impact across all major emission vectors.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3>Predictive Analytics</h3>
            <p>Visualize future emissions trends and see exactly how structural changes in your workflow affect your yearly footprint.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </div>
            <h3>Actionable Goals</h3>
            <p>Receive highly personalized, data-driven goals tailored to your unique operational parameters to hit compliance targets.</p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className={styles.howItWorksSection} aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title" className={styles.sectionTitle}>Workflow Integration</h2>
        <div className={styles.timeline}>
          <div className={styles.timelineStep}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h4>Data Ingestion</h4>
              <p>Input raw structural data regarding your daily operations, commute infrastructure, and energy grid usage.</p>
            </div>
          </div>
          <div className={styles.timelineStep}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h4>LLM Processing</h4>
              <p>Google&apos;s advanced multimodal architecture processes your data instantly through secure inference nodes.</p>
            </div>
          </div>
          <div className={styles.timelineStep}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h4>Optimization Output</h4>
              <p>Deploy your tailored reduction plan and monitor your analytical dashboard for continuous compliance metrics.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
