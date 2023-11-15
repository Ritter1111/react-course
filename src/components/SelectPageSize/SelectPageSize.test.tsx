import { render, screen } from '@testing-library/react';
import { SelectPageSize } from './SelectPageSize';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

// const renderComponent = () => {
//   return render(
//     <Provider store={store}>
//     <SelectPageSize />
//     </Provider>
//   );
// };

describe('SelectPageSize component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectPageSize />
      </Provider>
    );

    const selectInput = getByTestId('select-input');
    expect(selectInput).toBeInTheDocument();

    const inputSizeOptions = screen.getAllByRole('option');
    inputSizeOptions.forEach((option) => {
      expect(option).toBeInTheDocument();
    });
  });

  // test('calls onInputValueChange with the correct value when select input changes', () => {
  //   const { getByTestId } = renderComponent();
  //   const selectInput = getByTestId('select-input');

  //   fireEvent.change(selectInput, { target: { value: '15' } });

  //   expect(mockOnInputValueChange).toHaveBeenCalledWith(15);
  // });
});
