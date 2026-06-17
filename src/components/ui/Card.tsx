import styles from './Card.module.css';

/** Props accepted by the reusable Card component. */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

/**
 * Reusable bento-box card used throughout the Dashboard.
 *
 * Renders an optional title header and wraps children in a
 * content container with consistent padding and styling.
 */
export function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`${styles.card} ${className}`} role="region" aria-label={title}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
