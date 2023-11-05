import { useState } from 'react';
import styles from './ErrorBtn.module.css';

export default function ErrorBtn() {
  const [error, setError] = useState(false);

  if (error) throw new Error('Error on click');

  return (
    <button className={styles.error_btn} onClick={() => setError(true)}>
      Error
    </button>
  );
}
