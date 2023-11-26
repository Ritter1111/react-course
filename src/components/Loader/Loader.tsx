import { FC } from "react";
import styles from "./Loader.module.css";

export const Loader: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  );
};
