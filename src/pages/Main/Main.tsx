import { Link } from 'react-router-dom';
import styles from './Main.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Main() {
  const uncontrolledData = useSelector(
    (state: RootState) => state.uncontrolledForm.list
  );
  return (
    <div className={styles.container}>
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
      <div className={styles.listContainer}>
        {uncontrolledData.map((item, idx) => (
          <div key={idx} className={styles.uncontrolledBox}>
            <div>Age: {item.age}</div>
            <div>Name: {item.name}</div>
            <div>Email: {item.email}</div>
            <div>Gender: {item.gender}</div>
            <div>Password: {item.password}</div>
            <div>Password2: {item.password2}</div>
            <div>Accept Terms: {item.acceptTerm}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
