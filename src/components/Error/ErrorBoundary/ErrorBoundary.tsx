import React from 'react';
import {
  IErrorBoundaryProps,
  IErrorBoundaryState,
} from '../../../interfaces/error-boudary.interface';
import NotFound from '../../NotFound/NotFound';

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
      return <NotFound />;
    }

    return this.props.children;
  }
}
