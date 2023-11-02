import styles from './Pagination.module.css';

interface IPagination {
  onPageChange: (currPage: number) => void;
  currPage: number;
  totalPages: number;
}

export default function Pagination({
  onPageChange,
  currPage,
  totalPages,
}: IPagination) {
  return (
    <div>
      <button
        disabled={currPage === 1}
        className={styles.btn}
        onClick={() => onPageChange(currPage - 1)}
      >
        Prev
      </button>
      <span className={styles.pageNumber}>{currPage}</span>
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
