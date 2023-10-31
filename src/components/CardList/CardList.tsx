import Card from '../Card/Card';
import { ICard } from '../../interfaces/card.interface';
import NotFound from '../NotFound/NotFound';

export default function CardList({ results }: ICard) {
  if (!results) return <NotFound />;

  return results.map((item) => (
    <Card
      key={item.id}
      image={item.image}
      species={item.species}
      name={item.name}
    />
  ));
}
