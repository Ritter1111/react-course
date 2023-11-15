import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import Details from './Details';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { cardProps } from '../../test/mock_data';
// import { AppContext, AppContextProvider } from '../../context';
import { Card } from '../../components/Card/Card';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
// import { rest } from 'msw'
import { server } from '../../test/server';

describe('Details component', () => {
  // const mockedUseFetching = vi.hoisted(() => vi.fn());

  // vi.mock('../../hooks/useFetching', () => ({
  //   useFetching: mockedUseFetching,
  // }));

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
    // mockedUseFetching.mockImplementationOnce(() => ({
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
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
      // </AppContext.Provider>
    );

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });
  });

  it('no loading indicator when loading finished', async () => {
    // mockedUseFetching.mockImplementationOnce(() => ({
    //   fetchCardById: vi.fn(),
    //   loading: false,
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
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
      // </AppContext.Provider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loader')).toBeNull();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    // mockedUseFetching.mockImplementationOnce(() => ({
    //   fetchCardById: vi.fn(),
    //   loading: false,
    // }));
    await act(async () => {
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
          <MemoryRouter>
            <Details />
          </MemoryRouter>
        </Provider>
        // </AppContext.Provider>
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
    // mockedUseFetching.mockImplementationOnce(() => ({
    //   fetchCardById: vi.fn(),
    //   loading: false,
    // }));
    render(
      // <AppContextProvider>
      <Provider store={store}>
        <MemoryRouter initialEntries={['/detail/1']}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>
      // </AppContextProvider>
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
