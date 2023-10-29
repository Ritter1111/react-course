import React from 'react';
import Card from '../Card/Card';
import { ICard } from '../../interfaces/Card.interface';
import NotFound from '../NotFound/NotFound';

export default class CardList extends React.Component<ICard> {
  render() {
    const { results } = this.props;
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
}
