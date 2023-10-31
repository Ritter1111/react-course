import MyInput from '../../UI/Input/MyInput';
import MyButton from '../../UI/Button/MyButton';
import { useState } from 'react';
import styles from './CardSearch.module.css';
import { ICardSearchProps } from '../../interfaces/search-bar.interface';

export default function CardSearch({ handleSearchClick, handleInputChange, value }: ICardSearchProps) {
  const [error, setError] = useState(false)

    if (error) {
    throw new Error('Error on click');
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <MyInput
          value={value}
          placeholder="Type to search..."
          className={styles.input}
          onChange={handleInputChange}
        />
        <MyButton
          className={styles.btn_search}
          onClick={handleSearchClick}
        >
          <div className={styles.search_icon}>Search</div>
        </MyButton>
      </div>
      <MyButton className={styles.error_btn} onClick={() => setError(true)}>
        Error
      </MyButton>
    </div>
  );
}