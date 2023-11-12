import { render, fireEvent, screen } from '@testing-library/react';
import { SelectPageSize } from './SelectPageSize';

const mockOnInputValueChange = vi.fn();

const renderComponent = (value: number) => {
  return render(
    <SelectPageSize onInputValueChange={mockOnInputValueChange} value={value} />
  );
};

describe('SelectPageSize component', () => {
  test('renders correctly', () => {
    const { getByTestId } = renderComponent(10);

    const selectInput = getByTestId('select-input');
    expect(selectInput).toBeInTheDocument();

    const inputSizeOptions = screen.getAllByRole('option');
    inputSizeOptions.forEach((option) => {
      expect(option).toBeInTheDocument();
    });
  });

  test('calls onInputValueChange with the correct value when select input changes', () => {
    const { getByTestId } = renderComponent(10);
    const selectInput = getByTestId('select-input');

    fireEvent.change(selectInput, { target: { value: '15' } });

    expect(mockOnInputValueChange).toHaveBeenCalledWith(15);
  });
});
