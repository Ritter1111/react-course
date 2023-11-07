import useNavigateToPage from '../../hooks/useNavigate';
import styles from './Card.module.css';

export type CardProps = {
  id: number;
  title: string;
  images: string;
};

export const Card: React.FC<CardProps> = ({ title, images, id }) => {
  const { navigateToCard } = useNavigateToPage();

  return (
    <div className={styles.container} onClick={() => navigateToCard(`/${id}`)}>
      <img className={styles.img} src={images} alt={title} />
      <h4 className={styles.title}>{title}</h4>
    </div>
  );
};
