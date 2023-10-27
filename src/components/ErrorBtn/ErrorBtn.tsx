import React from 'react';
import { ErrorBtnProps } from '../../interfaces/ErrorBoudary.interface';
import styles from './ErrorBtn.module.css';

export default class ErrorBtn extends React.Component<ErrorBtnProps> {
  render() {
    return (
      <button onClick={this.props.throwError} className={styles.error_btn}>
        Error
      </button>
    );
  }
}
