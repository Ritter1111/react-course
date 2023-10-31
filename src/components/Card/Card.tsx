import { ICardData } from '../../interfaces/Card.interface';
import styles from './Card.module.css';

export default function Card({ name, image, species }: ICardData) {
  return (
    <div className={styles.container}>
        <img src={image} />
        <h4 className={styles.img}>{name}</h4>
        <p className={styles.species}>Species: {species}</p>
      </div>
  )
}