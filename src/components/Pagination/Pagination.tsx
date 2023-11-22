import React from "react";
// import { useQueryParams } from '../../hooks/useQueryParams';
import styles from "./Pagination.module.css";

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
  // const { queryLimit, setSearchParams } = useQueryParams();

  const handlePrevClick = () => {
    const newPage = currPage - 1;
    onPageChange(newPage);
    updateQueryParams(newPage);
  };

  const handleNextClick = () => {
    const newPage = currPage + 1;
    onPageChange(newPage);
    updateQueryParams(newPage);
  };

  const updateQueryParams = (newPage: number) => {
    // setSearchParams({
    //   page: `${newPage}`,
    //   limit: queryLimit,
    // });
  };

  return (
    <div>
      <div className={styles.pagination}>
        <div>
          <button
            disabled={currPage === 1}
            className={styles.btn}
            onClick={handlePrevClick}
          >
            Prev
          </button>
          <span className={styles.pageNumber}>
            {currPage} ... {totalPages}
          </span>
          <button
            disabled={currPage >= totalPages}
            className={styles.btn}
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
