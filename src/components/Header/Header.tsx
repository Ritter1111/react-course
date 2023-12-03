import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/uncontrolled-form" className={styles.navLink}>
                uncontrolled-form
              </Link>
            </li>
            <li>
              <Link to="/react-hook-form" className={styles.navLink}>
                react-hook-form
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}