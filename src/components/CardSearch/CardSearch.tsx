import styles from './CardSearch.module.css';

export interface ISearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  value: string;
}

export const CardSearch: React.FC<ISearchProps> = ({
  value,
  onChange,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <input
          value={value}
          placeholder="Type to search..."
          className={styles.input}
          onChange={onChange}
        />
        <button className={styles.btn_search} onClick={onClick}>
          <div className={styles.search_icon}>Search</div>
        </button>
      </div>
    </div>
  );
};
