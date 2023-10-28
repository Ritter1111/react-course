import React from 'react';
import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from '../../interfaces/ErrorBoudary.interface';
import styles from './ErrorBoundary.module.css';

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: error });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container_error}>
          <h1>Something went wrong</h1>
          <br></br>
          <span>Reload page</span>
        </div>
      );
    }

    return this.props.children;
  }
}
