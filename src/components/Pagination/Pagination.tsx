import React from "react";
import { useRouter } from "next/router";
import styles from "./Pagination.module.css";

export interface PageInfo {
  currPage: number;
  totalPages: number;
}

export interface IPaginationProps {
  onPageChange: (currPage: number) => void;
  pageInfo: PageInfo;
}

export const Pagination: React.FC<IPaginationProps> = ({
  onPageChange,
  pageInfo,
  // currPage,
  // totalPages,
}) => {
  const router = useRouter();

  const handlePrevClick = () => {
    const newPage = pageInfo.currPage - 1;
    onPageChange(newPage);
    // updateQueryParams(newPage);
  };

  const handleNextClick = () => {
    const newPage = pageInfo.currPage + 1;
    onPageChange(newPage);
    // updateQueryParams(newPage);
  };

  // const updateQueryParams = (newPage: number) => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: {...router.query, page: newPage}
  //   })
  // };

  return (
    <div>
      <div className={styles.pagination}>
        <div>
          <button
            disabled={pageInfo.currPage === 1}
            className={styles.btn}
            onClick={handlePrevClick}
          >
            Prev
          </button>
          <span className={styles.pageNumber}>
            {pageInfo.currPage} ... {pageInfo.totalPages}
          </span>
          <button
            disabled={pageInfo.currPage >= pageInfo.totalPages}
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
