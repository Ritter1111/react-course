import { render, screen } from "@testing-library/react";
import { SelectPageSize } from "./SelectPageSize";
import { Provider } from "react-redux";
import { store } from "../../store/store";

describe("SelectPageSize component", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <SelectPageSize />
      </Provider>,
    );

    const selectInput = getByTestId("select-input");
    expect(selectInput).toBeInTheDocument();

    const inputSizeOptions = screen.getAllByRole("option");
    inputSizeOptions.forEach((option) => {
      expect(option).toBeInTheDocument();
    });
  });
});
