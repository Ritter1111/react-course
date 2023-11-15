import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Card } from './Card';
import { cardProps, detailedMockData } from '../../test/mock_data';
import Details from '../../pages/Details/Details';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { server } from '../../test/server';
import { rest } from 'msw';
// import { AppContext } from '../../context';

describe('Card component', async () => {
  // const mockedUseFetching = vi.hoisted(() => vi.fn());

  // vi.mock('../../hooks/useFetching', () => ({
  //   useFetching: mockedUseFetching,
  // }));

  // beforeEach(() => {
  //   vi.clearAllMocks();
  // });

  // afterEach(() => {
  //   vi.clearAllMocks();
  // });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders card data correctly', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Card {...cardProps} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sample Card/i)).toBeDefined();
    expect(screen.getByTestId('card-image')).toHaveAttribute(
      'src',
      'sample-image.jpg'
    );
    expect(screen.getByTestId('card-image')).toHaveAttribute('alt');
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    // mockedUseFetching.mockImplementation(() => ({
    //   fetchCardById: vi.fn(),
    //   loading: true,
    // }));
    render(
      // <AppContext.Provider
      //   value={{
      //     items: [],
      //     searchValue: '',
      //     delailsData: detailedMockData,
      //     setDetailsData: vi.fn,
      //     setItems: vi.fn,
      //     setSearchValue: vi.fn,
      //   }}
      // >
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
      // </AppContext.Provider>
    );

    await act(async () => {
      const cardContainer = screen.getByTestId('card-container');
      fireEvent.click(cardContainer);
    });

    await waitFor(() => {
      const cardContainer = screen.getByTestId('details');
      expect(cardContainer).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    // const mockFetchCard = vi.fn();
    // mockedUseFetching.mockImplementationOnce(() => ({
    //   fetchCardById: mockFetchCard,
    // }));

    render(
      // <AppContext.Provider
      //   value={{
      //     items: [],
      //     searchValue: '',
      //     delailsData: detailedMockData,
      //     setDetailsData: vi.fn,
      //     setItems: vi.fn,
      //     setSearchValue: vi.fn,
      //   }}
      // >
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
      // </AppContext.Provider>
    );

    server.use(
      rest.get('https://api.jikan.moe/v4/manga/1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(detailedMockData));
      })
    );

    await act(async () => {
      const cardContainer = screen.getByTestId('card-container');
      fireEvent.click(cardContainer);
    });

    await waitFor(() => {
      const cardContainer = screen.getByTestId('details');
      expect(cardContainer).toBeInTheDocument();
    });
  });
});
