import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Error/ErrorBoundary/ErrorBoundary';
import { Router } from './router/router';

export const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ErrorBoundary>
);
