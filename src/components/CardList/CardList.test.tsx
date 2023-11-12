import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { CardList } from './CardList';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../../context';

const items = [
  {
    mal_id: 1,
    title: 'Card 1',
    images: { jpg: { image_url: 'image1.jpg' } },
  },
];

describe('CardList component', () => {
  beforeEach(() => {});

  it('renders the specified number of cards', async () => {
    await act(async () => {
      render(
        <AppContext.Provider
          value={{
            items,
            searchValue: '',
            delailsData: undefined,
            setDetailsData: vi.fn,
            setItems: vi.fn,
            setSearchValue: vi.fn,
          }}
        >
          <MemoryRouter initialEntries={['/']}>
            <CardList />
          </MemoryRouter>
        </AppContext.Provider>
      );
    });

    await waitFor(() => {
      expect(document.body.getElementsByClassName('card').length).toBe(
        items.length
      );
    });
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    await act(async () => {
      render(
        <AppContext.Provider
          value={{
            items: [],
            searchValue: '',
            delailsData: undefined,
            setDetailsData: vi.fn,
            setItems: vi.fn,
            setSearchValue: vi.fn,
          }}
        >
          <CardList />
        </AppContext.Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('No data received')).toBeInTheDocument();
    });
  });
});
