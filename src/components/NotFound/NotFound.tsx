import { Component } from 'react';
import styles from './NotFound.module.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className={styles.not_found}>
        <h3>Oops!</h3>
        <h1>No data received</h1>
      </div>
    );
  }
}
