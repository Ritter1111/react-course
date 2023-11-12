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
import { AppContext } from '../../context';

describe('Card component', async () => {
  const mockedUseFetching = vi.hoisted(() => vi.fn());

  vi.mock('../../hooks/useFetching', () => ({
    useFetching: mockedUseFetching,
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

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
    mockedUseFetching.mockImplementation(() => ({
      fetchCardById: vi.fn(),
      loading: true,
    }));
    render(
      <AppContext.Provider
        value={{
          items: [],
          searchValue: '',
          delailsData: detailedMockData,
          setDetailsData: vi.fn,
          setItems: vi.fn,
          setSearchValue: vi.fn,
        }}
      >
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
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
    const mockFetchCard = vi.fn();
    mockedUseFetching.mockImplementationOnce(() => ({
      fetchCardById: mockFetchCard,
    }));

    render(
      <AppContext.Provider
        value={{
          items: [],
          searchValue: '',
          delailsData: detailedMockData,
          setDetailsData: vi.fn,
          setItems: vi.fn,
          setSearchValue: vi.fn,
        }}
      >
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    );

    await act(async () => {
      const cardContainer = screen.getByTestId('card-container');
      fireEvent.click(cardContainer);
    });

    await waitFor(async () => expect(mockFetchCard).toHaveBeenCalledWith(1));
  });
});
