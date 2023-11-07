import styles from './Pagination.module.css';

export interface IPaginationProps {
  onPageChange: (currPage: number) => void;
  currPage: number;
  totalPages: number;
}

export const Pagination: React.FC<IPaginationProps> = ({
  onPageChange,
  currPage,
  totalPages,
}) => {
  return (
    <div>
      <div className={styles.pagination}>
        <div>
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
      </div>
    </div>
  );
};
