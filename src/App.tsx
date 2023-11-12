import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/Error/ErrorBoundary/ErrorBoundary';
import { AppContextProvider } from './context';
import { Router } from './router/router';

export const App = () => (
  <ErrorBoundary>
    <AppContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppContextProvider>
  </ErrorBoundary>
);
