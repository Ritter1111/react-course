import React, { useState } from 'react';
import styles from './PageSize.module.css';
import { ChangeSelectEvent } from '../../types/types';

interface PageSizeProps {
  onInputValueChange: (value: string) => void;
}

export default function PageSize({ onInputValueChange }: PageSizeProps) {
  const [inputValue] = useState('');

  const handleSelectChange = (event: ChangeSelectEvent) => {
    const value = event.target.value;
    onInputValueChange(value);
  };

  return (
    <div className={styles.inputContainer}>
      <h6 className={styles.mark}>Item on page:</h6>
      <select
        className={styles.inputSize}
        value={inputValue}
        onChange={handleSelectChange}
      >
        <option value="1">1</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
      </select>
    </div>
  );
}
