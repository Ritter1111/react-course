import React from 'react';
import Card from '../Card/Card';
import { ICard } from '../../interfaces/Card.interface';

export default class CardList extends React.Component<ICard> {
  render() {
    const { results } = this.props;
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
