import useNavigateToPage from '../../hooks/useNavigate';
import { ICardData } from '../../interfaces/search-result.interface';
import styles from './Card.module.css';

export default function Card({ title, images, mal_id }: ICardData) {
  const { navigateToCard } = useNavigateToPage();

  return (
    <div
      className={styles.container}
      onClick={() => navigateToCard(`/${mal_id}`)}
    >
      <h4 className={styles.title}>{title}</h4>
      <img className={styles.img} src={images.jpg.image_url} alt={title} />
    </div>
  );
}
