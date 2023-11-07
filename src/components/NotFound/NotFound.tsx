import styles from '../Error/ErrorBoundary/ErrorBoundary.module.css';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.container_error}>
      <h1>Something went wrong</h1>
      <br></br>
      <span>Reload page</span>
    </div>
  );
};
