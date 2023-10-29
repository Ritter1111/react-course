import MyInput from '../../UI/Input/MyInput';
import MyButton from '../../UI/Button/MyButton';
import React from 'react';
import { ICardSearchProps } from '../../interfaces/Input.interface';
import styles from './CardSearch.module.css';

export default class CardSearch extends React.Component<ICardSearchProps> {
  render() {
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
           <div  className={styles.search_icon}>Search</div> 
          </MyButton>
        </div>
        <MyButton className={styles.error_btn} onClick={this.props.throwError}>
          Error
        </MyButton>
      </div>
    );
  }
}
