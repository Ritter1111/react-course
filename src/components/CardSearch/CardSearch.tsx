import MyInput from '../../UI/Input/MyInput';
import MyButton from '../../UI/Button/MyButton';
import React from 'react';
import styles from './CardSearch.module.css';
import { ICardSearchProps } from '../../interfaces/search-bar.interface';

export default class CardSearch extends React.Component<ICardSearchProps> {
  render() {
    if (this.props.hasError) {
      throw new Error('Error on click');
    }
    return (
      <div className={styles.container}>
        <div className={styles.container_input}>
          <MyInput
            value={this.props.value}
            placeholder="Type to search..."
            className={styles.input}
            onChange={this.props.handleInput}
          />
          <MyButton
            className={styles.btn_search}
            onClick={this.props.handleClick}
          >
            <div className={styles.search_icon}>Search</div>
          </MyButton>
        </div>
        <MyButton className={styles.error_btn} onClick={this.props.throwError}>
          Error
        </MyButton>
      </div>
    );
  }
}
