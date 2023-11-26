import { render, screen, fireEvent } from "@testing-library/react";
import { SelectPageSize } from "./SelectPageSize";

const mockedUseRouter = vi.hoisted(() => vi.fn());
const mockedRouter = {
  query: { limit: "10" },
  push: vi.fn(),
};

vi.mock("next/router", () => ({
  useRouter: () => mockedRouter,
  ...mockedUseRouter,
}));

describe("SelectPageSize component", () => {
  beforeEach(() => {
    mockedRouter.query.limit = "10";
  });

  test("renders correctly", () => {
    const { getByTestId } = render(<SelectPageSize />);

    const selectInput = getByTestId("select-input");
    expect(selectInput).toBeInTheDocument();

    const inputSizeOptions = screen.getAllByRole("option");
    inputSizeOptions.forEach((option) => {
      expect(option).toBeInTheDocument();
    });
  });

  test("updates router query on limit change", () => {
    const { getByTestId } = render(<SelectPageSize />);

    const selectInput = getByTestId("select-input");
    fireEvent.change(selectInput, { target: { value: "20" } });

    expect(mockedRouter.push).toHaveBeenCalledWith({
      query: { ...mockedRouter.query, limit: "20" },
    });
  });
});
