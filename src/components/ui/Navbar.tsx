import Link from 'next/link';
import styles from './Navbar.module.css';

/**
 * Persistent top-level navigation bar.
 *
 * Rendered inside the root `layout.tsx` so it persists across
 * all routes without remounting.
 */
export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Main navigation">
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          CarbonWise
        </Link>
        <div className={styles.links} role="menubar">
          <Link href="/audit" className={styles.navLink} role="menuitem">
            Audit
          </Link>
          <Link href="/dashboard" className={styles.navLink} role="menuitem">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
