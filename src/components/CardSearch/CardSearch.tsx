import MyInput from '../../UI/Input/MyInput';
import MyButton from '../../UI/Button/MyButton';
import styles from './CardSearch.module.css';
import { ICardSearchProps } from '../../interfaces/search-bar.interface';
import ErrorBtn from '../Error/ErrorBtn/ErrorBtn';

export default function CardSearch({
  handleSearchClick,
  handleInputChange,
  value,
}: ICardSearchProps) {
  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <MyInput
          value={value}
          placeholder="Type to search..."
          className={styles.input}
          onChange={handleInputChange}
        />
        <MyButton className={styles.btn_search} onClick={handleSearchClick}>
          <div className={styles.search_icon}>Search</div>
        </MyButton>
      </div>
      <ErrorBtn />
    </div>
  );
}