import { ICard } from '../../interfaces/search-result.interface';
import Card from '../Card/Card';
import NotFound from '../NotFound/NotFound';
import styles from './CardList.module.css';

export default function CardList({ data }: ICard) {
  if (!data || data.length === 0) return <NotFound />;

  return (
    <div className={styles.container}>
      {data.map((item) => (
        <Card
          key={item.mal_id}
          title={item.title}
          images={item.images}
          mal_id={item.mal_id}
        />
      ))}
    </div>
  );
}
