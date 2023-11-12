import React, { useEffect, useState } from 'react';
import styles from './CardSearch.module.css';
import { getSearchParam, setSearchParam } from '../../utils/localStorage';

export interface ISearchProps {
  getCards: (value: string, page: number, limit: number) => void;
  limitItem: number;
}

export const CardSearch: React.FC<ISearchProps> = ({ getCards, limitItem }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedValue = getSearchParam('searchValue');
    if (storedValue) {
      setSearchValue(storedValue);
    }
  }, []);

  const handleButtonClick = () => {
    setSearchParam('searchValue', searchValue);
    setSearchValue(searchValue);
    getCards(searchValue, 1, limitItem);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <input
          value={searchValue}
          placeholder="Type to search..."
          className={styles.input}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className={styles.btn_search} onClick={handleButtonClick}>
          <div className={styles.search_icon}>Search</div>
        </button>
      </div>
    </div>
  );
};
