import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import Details from './Details';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { cardProps, detailedMockData } from '../../test/mock_data';
import { Card } from '../../components/Card/Card';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { server } from '../../test/server';
import { rest } from 'msw';

describe('Details component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('indicator loading', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('no loading indicator when loading finished', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    server.use(
      rest.get('https://api.jikan.moe/v4/manga/1', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(detailedMockData));
      })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Details />
          </MemoryRouter>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Monster')).toBeInTheDocument();
      expect(screen.getByText('162')).toBeInTheDocument();
      expect(screen.getByText('Manga')).toBeInTheDocument();
      expect(screen.getByText('9.15')).toBeInTheDocument();
      expect(screen.getByText('Sample description')).toBeInTheDocument();

      expect(screen.getByTestId('card-image')).toHaveAttribute(
        'src',
        'sample-image.jpg'
      );
    });
  });

  it('clicking the close button should hide the component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/detail/1']}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const detailsComponent = screen.getByTestId('details');
    expect(detailsComponent).toBeInTheDocument();

    const closeButton = screen.getByText('Closed');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('details')).toBeNull();
    });
  });
});
