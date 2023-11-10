import {
  fireEvent,
  render,
  renderHook,
  screen,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './Card';
// import * as useNavigateHooks from '../../hooks/useNavigate';
import { useNavigateToPage } from '../../hooks/useNavigate';

const mockedNavigator = vi.fn();

// vi.mock('react-router-dom', async () => {
//   const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
//   return {
//     ...actual,
//     MemoryRouter: actual.MemoryRouter,
//     useNavigate: () => ({
//       navigate: vi.fn().mockImplementation(() => {})
//     })
//   };
// });

describe('Card component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const cardProps = {
    id: 1,
    title: 'Sample Card',
    images: 'sample-image.jpg',
  };
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

  it.skip('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Card {...cardProps} />
      </MemoryRouter>
    );

    // const useNavigateToPageSpy = vi.spyOn(
    //   useNavigateHooks,
    //   'useNavigateToPage'
    // );

    const cardContainer = screen.getByTestId('card-container');

    fireEvent.click(cardContainer);

    // const navigateToCard =  vi.spyOn( useNavigateHooks.useNavigateToPage, 'navigateToCard')

    // useNavigateToPageSpy.mockImplementation(() => ({
    //   navigateToCard: (path: string) => {
    //     window.history.pushState({}, '', path);
    //     expect(path).toBe(`/${cardProps.id}`);
    //   },
    // }));

    const { result } = renderHook(() => useNavigateToPage());

    act(() => {
      result.current.navigateToCard('2');
    });

    expect(mockedNavigator).toHaveBeenCalled();
    // const { navigateToCard } = result.current

    // expect(result.current).toBe(`/${cardProps.id}`)
    // expect(useNavigateMock).toHaveBeenCalledWith({
    //   pathname: '/test-path',
    //   search: window.location.search,
    // });
    // expect(useNavigateToPageSpy).toHaveBeenCalledOnce()
    // expect(useNavigateToPageSpy).toHaveBeenCalledWith(`/${cardProps.id}`)
  });
});
