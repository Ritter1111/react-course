import React from 'react';
import { ICardData } from '../../interfaces/Card.interface';
import styles from './Card.module.css';

export default class Card extends React.Component<ICardData> {
  render() {
    const { name, image, species } = this.props;
    return (
      <div className={styles.container}>
        <img src={image} />
        <h4 className={styles.img}>{name}</h4>
        <p className={styles.species}>Species: {species}</p>
      </div>
    );
  }
}
