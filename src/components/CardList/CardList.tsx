import { useAppContext } from '../../context';
import { Card } from '../Card/Card';
import { NotFoundData } from '../NotFound/NotFoundData';
import styles from './CardList.module.css';

export const CardList: React.FC = () => {
  const { items } = useAppContext();
  {
    !items || (items.length === 0 && <NotFoundData />);
  }

  return (
    <div className={styles.container}>
      {items.map((item) => (
        <Card
          key={item.mal_id}
          title={item.title}
          images={item.images?.jpg.image_url}
          id={item.mal_id}
        />
      ))}
    </div>
  );
};
