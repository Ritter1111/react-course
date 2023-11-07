import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/Error/ErrorBoundary/ErrorBoundary';
import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';
import './main.css';
import React from 'react';
import { AppContextProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
