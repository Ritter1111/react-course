import React from 'react'
import { IResult } from '../../interfaces/Card.interface'
import styles from './Card.module.css'

export default class Card extends React.Component<IResult> {
  render() {
    const { name } = this.props
    return (
      <div className={styles.container}>
        <h5>{name}</h5>
      </div>
    )
  }
}
