import Card from '../Card/Card';
import { ICard } from '../../interfaces/Card.interface';
import NotFound from '../NotFound/NotFound';

export default function CardList({ results }: ICard) {
  if (!results) return <NotFound />;

  return results.map((item) => (
    <Card
      key={item.name}
      name={item.name}
      gender={item.gender}
    />
  ));
}
