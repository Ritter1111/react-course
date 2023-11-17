import React, { useEffect, useState } from 'react';
import styles from './CardSearch.module.css';
import { getSearchParam, setSearchParam } from '../../utils/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { saveSearchTerm } from '../../store/Search/search.slice';

export interface ISearchProps {
  getCards: (value: string, page: number, limit: number) => void;
  limitItem: number;
}

export const CardSearch: React.FC<ISearchProps> = ({ getCards, limitItem }) => {
  const dispatch = useDispatch();
  const sValue = useSelector((state: RootState) => state.search.searchTerm);
  const [inputValue, setInputValue] = useState(sValue);

  useEffect(() => {
    const storedValue = getSearchParam('searchValue');
    if (storedValue) {
      dispatch(saveSearchTerm(storedValue));
      setInputValue(storedValue);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    dispatch(saveSearchTerm(inputValue));
    setSearchParam('searchValue', inputValue);
    getCards(inputValue, 1, limitItem);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <input
          value={inputValue}
          placeholder="Type to search..."
          className={styles.input}
          onChange={handleInputChange}
        />
        <button className={styles.btn_search} onClick={handleButtonClick}>
          <div className={styles.search_icon}>Search</div>
        </button>
      </div>
    </div>
  );
};
