import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import { useFetching } from '../../hooks/useFetching';
import styles from './Details.module.css';
import { useAppContext } from '../../context';

export default function Details() {
  const { id } = useParams();
  const { fetchCardById, loading } = useFetching();
  const { delailsData } = useAppContext();

  useEffect(() => {
    fetchCardById(Number(id));
  }, [id]);

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.delails}>
        {loading && <Loader data-testid="loader" />}
        {!loading && (
          <>
            <Link className={styles.close} to={`/${window.location.search}`}>
              {' '}
              X
            </Link>
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
      <Link className={styles.closeBtn} to={`/${window.location.search}`}>
        Closed
      </Link>
    </div>
  );
}
