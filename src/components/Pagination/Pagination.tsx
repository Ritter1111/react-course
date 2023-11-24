import React, { FC } from "react";
import styles from "./Pagination.module.css";
import { useRouter } from "next/router";
import { IPagination } from "@/store/api/api";

export interface IPaginationProps {
  pageInfo: IPagination;
}

export const Pagination: FC<IPaginationProps> = ({ pageInfo }) => {
  const router = useRouter();

  const onPageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage },
    });
  };

  const handlePrevClick = () => {
    const newPage = pageInfo.current_page - 1;
    onPageChange(newPage);
  };

  const handleNextClick = () => {
    const newPage = pageInfo.current_page + 1;
    onPageChange(newPage);
  };

  return (
    <div>
      <div className={styles.pagination}>
        <div>
          <button
            disabled={pageInfo.current_page === 1}
            className={styles.btn}
            onClick={handlePrevClick}
          >
            Prev
          </button>
          <span className={styles.pageNumber}>
            {pageInfo.current_page} ... {pageInfo.last_visible_page}
          </span>
          <button
            disabled={pageInfo.current_page >= pageInfo.last_visible_page}
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
