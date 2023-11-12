import { useAppContext } from '../../context';
import { Card } from '../Card/Card';
import styles from './CardList.module.css';

export const CardList: React.FC = () => {
  const { items } = useAppContext();

  return (
    <div className={styles.container}>
      {!items ||
        (items.length === 0 && (
          <h2 className={styles.not_found}>No data received</h2>
        ))}
      {items.map((item) => (
        <div className="card" key={item.mal_id}>
          <Card
            key={item.mal_id}
            title={item.title}
            images={item.images?.jpg.image_url}
            id={item.mal_id}
          />
        </div>
      ))}
    </div>
  );
};
