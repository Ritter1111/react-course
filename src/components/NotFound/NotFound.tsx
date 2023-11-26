import { FC } from "react";
import styles from "./NotFound.module.css";

export const NotFound: FC = () => {
  return (
    <div className={styles.container_error} data-testid="not-found">
      <h1>404</h1>
      <h1>Something went wrong</h1>
    </div>
  );
};
