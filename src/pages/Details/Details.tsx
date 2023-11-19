import { Link, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import styles from './Details.module.css';
import { useGetCardQuery } from '../../store/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect } from 'react';
import { setDetailsPageLoading } from '../../store/loadingSlice/loading.slice';

export const Details: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetCardQuery(`${id}`);
  const dispatch = useDispatch();
  const detailsLoading = useSelector(
    (state: RootState) => state.loading.detailsLoading
  );

  useEffect(() => {
    dispatch(setDetailsPageLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className={styles.detailsContainer} data-testid="details">
      <div className={styles.delails}>
        {detailsLoading && <Loader data-testid="loader" />}
        {!detailsLoading && (
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
              <div>{data?.chapters || 'Chapters not available'}</div>
              <div className={styles.name}>Type:</div>
              <div>{data?.type || 'Type not available'}</div>
              <div className={styles.name}>Score:</div>
              <div>{data?.score || 'Score not available'}</div>
              <div className={styles.name}>Description: </div>
              <div>{data?.synopsis || 'Description not available'}</div>
            </div>
          </>
        )}
      </div>
      <Link className={styles.closeBtn} to={`/${window.location.search}`}>
        Closed
      </Link>
    </div>
  );
};
