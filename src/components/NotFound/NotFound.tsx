import { Component } from 'react';
import styles from './NotFound.module.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.not_found}>
        <h3>Uh-Oh...</h3>
        <h1>404 Not Found</h1>
      </div>
    );
  }
}
