import { ICardData } from '../../interfaces/search-result.interface';
import styles from './Card.module.css';

export default function Card({ title, images }: ICardData) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <img className={styles.img} src={images.jpg.image_url} alt={title} />
    </div>
  );
}
