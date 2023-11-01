import { ICardData } from '../../interfaces/Card.interface';
import image from '../../assets/star-warss.png'
import styles from './Card.module.css';

export default function Card({ name, gender }: ICardData) {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Name: {name}</h4>
      <h5 className={styles.title}>Gender: {gender}</h5>
      <img className={styles.img} src={image}/>
    </div>
  );
}
