import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          CarbonWise
        </Link>
        <div className={styles.links}>
          <Link href="/audit" className={styles.navLink}>
            Audit
          </Link>
          <Link href="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
