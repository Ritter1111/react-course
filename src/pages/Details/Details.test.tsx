import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import Details from './Details';
import { MemoryRouter } from 'react-router-dom';
import { detailedMockData } from '../../test/mock_data';
import { AppContext, AppContextProvider } from '../../context';

describe('Details component', () => {
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

  const mockUseParams = {
    id: '1',
  };

  it('indicator loading', async () => {
    mockedUseFetching.mockImplementationOnce(() => ({
      fetchCardById: vi.fn(),
      loading: true,
    }));

    const mResponce = {
      ok: true,
      json: vi.fn().mockResolvedValue(detailedMockData),
    };
    global.fetch = vi.fn().mockResolvedValue(mResponce as unknown as Response);
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
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </AppContext.Provider>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('no loading indicator when loading finished', async () => {
    mockedUseFetching.mockImplementationOnce(() => ({
      fetchCardById: vi.fn(),
      loading: false,
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
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    mockedUseFetching.mockImplementationOnce(() => ({
      fetchCardById: vi.fn(),
      loading: false,
    }));
    await act(async () => {
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
          <MemoryRouter>
            <Details />
          </MemoryRouter>
        </AppContext.Provider>
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
    mockedUseFetching.mockImplementationOnce(() => ({
      fetchCardById: vi.fn(),
      loading: false,
    }));
    render(
      <AppContextProvider>
        <MemoryRouter initialEntries={[`/detail/${mockUseParams.id}`]}>
          <Details />
        </MemoryRouter>
      </AppContextProvider>
    );

    const detailsComponent = screen.getByTestId('details');
    expect(detailsComponent).toBeInTheDocument();

    const cardContainer = screen.getByTestId('close-link');
    fireEvent.click(cardContainer);

    await waitFor(() => {
      expect(window.location.pathname).toBe(`/`);
    });
  });
});
