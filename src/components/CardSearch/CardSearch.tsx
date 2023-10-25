import { Component } from 'react';
import styles from './CardSearch.module.css';
import MyInput from '../../UI/Input/MyInput';
import MyButton from '../../UI/Button/MyButton';

export default class CardSearch extends Component {
  render() {
    return (
      <div className={styles.container}>
        <MyInput placeholder="Type to search..." className={styles.input} />
        <MyButton className={styles.btn_search}>Search</MyButton>
      </div>
    );
  }
}
