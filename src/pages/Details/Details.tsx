import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import useFetching from '../../hooks/useFetching';
import useNavigateToPage from '../../hooks/useNavigate';
import styles from './Details.module.css';

export default function Details() {
  const { id } = useParams();
  const { navigateToCard } = useNavigateToPage();
  const { fetchCardById, loading, delailsData } = useFetching();

  useEffect(() => {
    fetchCardById(Number(id));
  }, [id]);

  function handleCloseButton() {
    navigateToCard('/');
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.delails}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <button onClick={handleCloseButton} className={styles.close}>
              Close
            </button>
            <img
              src={delailsData?.images.jpg.image_url}
              className={styles.img}
            />
            <div className={styles.title}>{delailsData?.title}</div>
            <div>
              Episodes: {delailsData?.episodes}, Type: {delailsData?.type},{' '}
              {delailsData?.duration}
            </div>
          </>
        )}
      </div>
      <button className={styles.closeBtn} onClick={handleCloseButton}>
        Closed
      </button>
    </div>
  );
}
