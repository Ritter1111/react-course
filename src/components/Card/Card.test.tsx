import {
  act,
  createEvent,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './Card';

const cardProps = {
  id: 1,
  title: 'Sample Card',
  images: 'sample-image.jpg',
};

describe('Card component', () => {
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

  it.skip('Validate that clicking on a card opens a detailed card component', async () => {
    mockedUseFetching.mockImplementationOnce(() => ({
      fetchCardById: vi.fn(),
      loading: false,
    }));

    render(
      <MemoryRouter initialEntries={['/']}>
        <Card {...cardProps} />
      </MemoryRouter>
    );

    await act(async () => {
      const cardContainer = screen.getByTestId('card-container');
      const myEvent = createEvent.click(cardContainer, { button: 0 });
      fireEvent(cardContainer, myEvent);
    });
    await waitFor(() => {
      // screen.debug()
      const cardContainer = screen.getByTestId('details');
      expect(cardContainer).toBeInTheDocument();
      // expect(window.location.pathname).toEqual('/');
    });
  });
});
