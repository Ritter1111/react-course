import { Card } from '../Card/Card';
import styles from './CardList.module.css';

export type CardData = {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  chapters?: number;
  type?: string;
  duration?: string;
  synopsis?: string;
  score?: number;
};

export type CardDataProps = {
  cards: CardData[];
};

export const CardList: React.FC<CardDataProps> = ({ cards }) => {
  return (
    <div className={styles.container}>
      {cards.map((item) => (
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
