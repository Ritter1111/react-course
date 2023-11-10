// import * as useNavigateHooks from '../../hooks/useNavigate';
// import { useFetching } from '../../hooks/useFetching';
// import * as useContextHook from '../../context/index';
// import { HttpResponse, http } from 'msw';
// import { setupServer } from 'msw/node';
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import Details from './Details';
import { MemoryRouter } from 'react-router-dom';
// import { API_URL } from '../../utils/consts';
// import { fetchCard } from '../../utils/api';
import { detailedMockData } from '../../test/mock_data';
// import { AppContext } from '../../context';

// const server = setupServer(
//   http.get(`${API_URL}/1`, () => {
//     return HttpResponse.json({
//       delailsData: detailedMockData,
//     });
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe('Details component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock('../../context/index', () => ({
      useAppContext: () => ({
        delailsData: detailedMockData,
        setDetailsData: vi.fn(),
      }),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('indicator loading', async () => {
    // await act(async () => {
    const mResponce = {
      ok: true,
      json: vi.fn().mockResolvedValue(detailedMockData),
    };
    global.fetch = vi.fn().mockResolvedValue(mResponce as unknown as Response);
    // await act(async () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    // });
    // });

    await waitFor(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    });

    // expect(screen.getByTestId('loader')).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(screen.queryByTestId('loader')).toBeNull();
    // });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    // const result = await fetchCard(1);
    // expect(result.data).toBeDefined();
    const mResponce = {
      ok: true,
      json: vi.fn().mockResolvedValue(detailedMockData),
    };
    global.fetch = vi.fn().mockResolvedValue(mResponce as unknown as Response);
    await act(async () => {
      render(
        <MemoryRouter>
          <Details />
        </MemoryRouter>
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

  it.skip('clicking the close button should hide the component', async () => {
    vi.mock('../../context/index', () => ({
      useAppContext: () => ({
        delailsData: detailedMockData,
        setDetailsData: vi.fn(),
      }),
    }));

    render(
      <MemoryRouter initialEntries={[`/${detailedMockData.mal_id}`]}>
        <Details />
      </MemoryRouter>
    );

    expect(screen.getByText(detailedMockData.title)).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Closed'));
    });

    await waitFor(() => {
      expect(screen.queryByText(detailedMockData.title)).toBeNull();
    });

    expect(window.location.pathname).toBe('/');
  });

  // it('closes the component when clicking the close button', async () => {
  //   const mResponce = {
  //     ok: true,
  //     json: vi.fn().mockResolvedValue(detailedMockData)
  //   }
  //   global.fetch = vi.fn().mockResolvedValue(mResponce as unknown as Response)
  //   await act(async () => {
  //     render(
  //       <MemoryRouter initialEntries={['/1']}>
  //         <Details />
  //       </MemoryRouter>
  //     );
  //   });
  //   screen.debug()
  //   // render(
  //   //   <AppContext.Provider
  //   //   value={{
  //   //     items: [],
  //   //     searchValue: '',
  //   //     delailsData: detailedMockData,
  //   //     setDetailsData: vi.fn,
  //   //     setItems: vi.fn,
  //   //     setSearchValue: vi.fn,
  //   //   }}
  //   // >
  //   //   <MemoryRouter initialEntries={['/1']} initialIndex={0}>
  //   //     <Details />
  //   //   </MemoryRouter>
  //   // </AppContext.Provider>
  //   //   // <MemoryRouter initialEntries={['/1']} initialIndex={0}>
  //   //   //   <Details />
  //   //   // </MemoryRouter>
  //   // );

  //   expect(screen.getByText('Chapters:')).toBeInTheDocument();
  //   act(() => {
  //     screen.getByText('Closed').click();
  //   });

  //   // await waitFor(() => {
  //   //   expect(screen.queryByText('Chapters:')).toBeNull();
  //   // });
  // });
});
