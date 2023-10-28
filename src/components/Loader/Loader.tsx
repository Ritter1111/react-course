import { Component } from 'react';
import styles from './Loader.module.css';

export default class Loader extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.loader}></div>
      </div>
    );
  }
}
