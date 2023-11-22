import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => {
  return (
    <div className={styles.container_error}>
      <h1>404</h1>
      <h1>Something went wrong</h1>
    </div>
  );
};
