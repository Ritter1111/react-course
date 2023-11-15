// import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
// import { useFetching } from '../../hooks/useFetching';
import styles from './Details.module.css';
// import { useAppContext } from '../../context';
import { useGetCardQuery } from '../../store/api/api';

export default function Details() {
  const { id } = useParams();
  // const { fetchCardById, loading } = useFetching();
  const { data, isLoading } = useGetCardQuery(`${id}`);
  // const { delailsData } = useAppContext();

  // useEffect(() => {
  //   fetchCardById(Number(id));
  // }, [id]);

  return (
    <div className={styles.detailsContainer} data-testid="details">
      <div className={styles.delails}>
        {isLoading && <Loader data-testid="loader" />}
        {!isLoading && (
          <>
            <Link className={styles.close} to={`/${window.location.search}`}>
              {' '}
              X
            </Link>
            <div className={styles.title}>{data?.title}</div>
            <img
              src={data?.images?.jpg.large_image_url}
              className={styles.img}
              data-testid="card-image"
            />
            <div className={styles.description}>
              <div className={styles.name}>Chapters:</div>
              <div>{data?.chapters}</div>
              <div className={styles.name}>Type:</div>
              <div>{data?.type}</div>
              <div className={styles.name}>Score:</div>
              <div>{data?.score}</div>
              <div className={styles.name}>Description: </div>
              <div>{data?.synopsis}</div>
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
