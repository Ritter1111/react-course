import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export type CardProps = {
  id: number;
  title: string;
  images: string;
};

export const Card: React.FC<CardProps> = ({ title, images, id }) => {
  return (
    <Link
      to={`detail/${id}${window.location.search}`}
      data-testid="card-container"
    >
      <div className={styles.container}>
        <img
          className={styles.img}
          src={images}
          alt={title}
          data-testid="card-image"
        />
        <h4 className={styles.title}>{title}</h4>
      </div>
    </Link>
  );
};
