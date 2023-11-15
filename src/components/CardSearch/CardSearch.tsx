import React, { useEffect } from 'react';
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

  useEffect(() => {
    const storedValue = getSearchParam('searchValue');
    if (storedValue) {
      dispatch(saveSearchTerm(storedValue));
    }
  }, [dispatch]);

  const handleButtonClick = () => {
    setSearchParam('searchValue', sValue);
    getCards(sValue, 1, limitItem);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <input
          value={sValue}
          placeholder="Type to search..."
          className={styles.input}
          onChange={(e) => dispatch(saveSearchTerm(e.target.value))}
        />
        <button className={styles.btn_search} onClick={handleButtonClick}>
          <div className={styles.search_icon}>Search</div>
        </button>
      </div>
    </div>
  );
};
