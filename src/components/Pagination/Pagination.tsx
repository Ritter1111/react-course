import { IPaginationProps } from '../../interfaces/pagination.interface';
import styles from './Pagination.module.css';

export default function Pagination({
  onPageChange,
  currPage,
  totalPages,
}: IPaginationProps) {
  return (
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
    </div>
  );
}
