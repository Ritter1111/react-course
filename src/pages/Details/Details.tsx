import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { useFetching } from '../../hooks/useFetching';
import styles from './Details.module.css';
import { useAppContext } from '../../context';

export default function Details() {
  const { id } = useParams();
  // const { navigateToCard } = useNavigateToPage();
  const { fetchCardById, loading } = useFetching();
  const { delailsData } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCardById(Number(id));
  }, [id]);

  function handleCloseButton() {
    // navigateToCard('/');
    navigate({ pathname: '/', search: window.location.search });
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.delails}>
        {loading && <Loader data-testid="loader" />}
        {!loading && (
          <>
            <button onClick={handleCloseButton} className={styles.close}>
              X
            </button>
            <div className={styles.title}>{delailsData?.title}</div>
            <img
              src={delailsData?.images?.jpg.large_image_url}
              className={styles.img}
              data-testid="card-image"
            />
            <div className={styles.description}>
              <div className={styles.name}>Chapters:</div>
              <div>{delailsData?.chapters}</div>
              <div className={styles.name}>Type:</div>
              <div>{delailsData?.type}</div>
              <div className={styles.name}>Score:</div>
              <div>{delailsData?.score}</div>
              <div className={styles.name}>Description: </div>
              <div>{delailsData?.synopsis}</div>
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
