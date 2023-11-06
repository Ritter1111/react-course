import styles from './CardSearch.module.css';
import { ICardSearchProps } from '../../interfaces/search-bar.interface';

export default function CardSearch({
  handleSearchClick,
  handleInputChange,
  value,
}: ICardSearchProps) {
  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <input
          value={value}
          placeholder="Type to search..."
          className={styles.input}
          onChange={handleInputChange}
        />
        <button className={styles.btn_search} onClick={handleSearchClick}>
          <div className={styles.search_icon}>Search</div>
        </button>
      </div>
    </div>
  );
}
