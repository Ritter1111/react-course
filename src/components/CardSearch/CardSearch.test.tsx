import { render, screen, fireEvent, act } from '@testing-library/react';
import { CardSearch } from './CardSearch';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

describe('CardSearch component', () => {
  const storage: Record<string, string> = {};

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key: string) => storage[key]),
      setItem: vi.fn((key: string, value: string) => (storage[key] = value)),
    },
    writable: true,
  });

  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Provider store={store}>
        <CardSearch getCards={vi.fn()} limitItem={10} />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Type to search...');
    fireEvent.change(searchInput, { target: { value: 'TestValue' } });

    const searchButton = screen.getByText('Search');
    act(() => {
      fireEvent.click(searchButton);
    });

    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'searchValue',
      'TestValue'
    );
  });

  it('component retrieves the value from the local storage upon mounting', () => {
    render(
      <Provider store={store}>
        <CardSearch getCards={vi.fn()} limitItem={10} />
      </Provider>
    );

    expect(window.localStorage.getItem).toHaveBeenCalledWith('searchValue');

    expect(screen.getByDisplayValue('TestValue')).toBeInTheDocument();
  });
});
