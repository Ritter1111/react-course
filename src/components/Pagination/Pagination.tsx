import { IPaginationProps } from '../../interfaces/pagination.interface';
import SelectPageSize from '../SelectPageSize/SelectPageSize';
import styles from './Pagination.module.css';

export default function Pagination({
  onPageChange,
  currPage,
  totalPages,
  handleInputValueChange,
  limitPageItem,
}: IPaginationProps) {
  return (
    <div>
      <span className={styles.mark}>
        The maximum number of items on the page in the Jikan API is limited to
        30
      </span>
      <div className={styles.pagination}>
        <button
          disabled={currPage === 1}
          className={styles.btn}
          onClick={() => onPageChange(currPage - 1)}
        >
          Prev
        </button>
        <span className={styles.pageNumber}>
          {currPage} ... {totalPages}
        </span>
        <button
          disabled={currPage >= totalPages}
          className={styles.btn}
          onClick={() => onPageChange(currPage + 1)}
        >
          Next
        </button>
        <SelectPageSize
          onInputValueChange={handleInputValueChange}
          value={limitPageItem}
        />
      </div>
    </div>
  );
}
