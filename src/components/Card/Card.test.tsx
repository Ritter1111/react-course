import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Card } from './Card';
const MockDetails = () => {
  return <div data-testid="mock-details">Mock Details Component</div>;
};

const cardProps = {
  id: 1,
  title: 'Sample Card',
  images: 'sample-image.jpg',
};

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
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Card {...cardProps} />} />
          <Route path="detail/:id" element={<MockDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await act(async () => {
      screen.debug();

      const cardContainer = screen.getByTestId('card-container');
      fireEvent.click(cardContainer);
    });
    await waitFor(() => {
      const cardContainer = screen.getByTestId('mock-details');
      expect(cardContainer).toBeInTheDocument();
    });
  });

  // it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
  //  const fetchCard = mockedUseFetching.mockImplementationOnce(() => ({
  //     fetchCardById: vi.fn(),
  //   }));

  // const fetchCard = vi.fn();
  // mockedUseFetching.mockImplementationOnce(() => ({
  //   fetchCardById: fetchCard,
  // }));

  //   render(
  //     <MemoryRouter initialEntries={['/']}>
  //       <Card {...cardProps} />
  //     </MemoryRouter>
  //   );

  //   const cardContainer = screen.getByTestId('card-container');
  //   fireEvent.click(cardContainer);

  //   await waitFor(() => expect(fetchCard).toHaveBeenCalled());
  //     //   const cardContainer = screen.getByText(/Sample Card/i);

  //     //   const myEvent = createEvent.click(cardContainer, { button: 0 });
  //     //   fireEvent(cardContainer, myEvent);

  //     // screen.debug();
  //     // await waitFor(async () => expect(fetchCard).toHaveBeenCalled())

  // })
});
