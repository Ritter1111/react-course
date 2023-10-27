import MyInput from '../../UI/Input/MyInput';
import MyButton from '../../UI/Button/MyButton';
import React from 'react';
import { ICardSearchProps } from '../../interfaces/Input.interface';
import { BsSearchHeart } from 'react-icons/bs';
import styles from './CardSearch.module.css';

export default class CardFilter extends React.Component<ICardSearchProps> {
  render() {
    return (
      <div className={styles.container}>
        <MyInput
          value={this.props.param}
          placeholder="Type to search..."
          className={styles.input}
          onChange={this.props.handleInput}
        />
        <MyButton
          className={styles.btn_search}
          onClick={this.props.handleClick}
        >
          <BsSearchHeart className={styles.search_icon} />
        </MyButton>
      </div>
    );
  }
}
