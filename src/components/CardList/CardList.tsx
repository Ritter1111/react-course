import Card from '../Card/Card';
import { ICard } from '../../interfaces/Card.interface';
import NotFound from '../NotFound/NotFound';

export default function CardList({ data }: ICard) {
  if (!data) return <NotFound />;

  return data.map((item) => (
    <Card
      key={item.mal_id}
      title={item.title}
      images={item.images}
      mal_id={item.mal_id}
    />
  ));
}
