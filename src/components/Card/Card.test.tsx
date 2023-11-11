import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './Card';

const cardProps = {
  id: 1,
  title: 'Sample Card',
  images: 'sample-image.jpg',
};

describe('Card component', () => {
  beforeEach(() => {
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
    render(
      <MemoryRouter initialEntries={['/']}>
        <Card {...cardProps} />
      </MemoryRouter>
    );

    const cardContainer = screen.getByTestId('card-container');
    fireEvent.click(cardContainer);
    expect(window.location.pathname).toBe(`detail/${cardProps.id}`);
  });
});
