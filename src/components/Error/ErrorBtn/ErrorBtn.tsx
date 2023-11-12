import React, { useState } from 'react';
import styles from './ErrorBtn.module.css';

export const ErrorBtn: React.FC = () => {
  const [error, setError] = useState(false);

  if (error) throw new Error('Error on click');

  return (
    <button className={styles.error_btn} onClick={() => setError(true)}>
      Error
    </button>
  );
};
