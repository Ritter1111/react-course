import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./CardSearch.module.css";
import { useRouter } from "next/router";

export const CardSearch: FC = () => {
  const router = useRouter();
  const inputValueRef = useRef("");

  useEffect(() => {
    inputValueRef.current = String(router.query.q) || "";
  }, [router.query.q]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputValueRef.current = e.target.value;
  };

  const handleButtonClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, q: inputValueRef.current },
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_input}>
        <input
          defaultValue={router.query.q}
          placeholder="Type to search..."
          className={styles.input}
          onChange={handleInputChange}
        />
        <button className={styles.btn_search} onClick={handleButtonClick}>
          <div className={styles.search_icon}>Search</div>
        </button>
      </div>
    </div>
  );
};
