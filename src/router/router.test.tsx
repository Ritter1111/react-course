import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Router } from './router';
import { Provider } from 'react-redux';
import { store } from '../store/store';

describe('Router', () => {
  it('renders Main component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

    const mainComponent = screen.getByTestId('main');
    expect(mainComponent).toBeInTheDocument();
  });

  it('render Details component for /detail/:id path', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/detail/1']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );

    const detailsComponent = screen.getByTestId('details');
    expect(detailsComponent).toBeInTheDocument();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unkdcncdks']}>
          <Router />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
