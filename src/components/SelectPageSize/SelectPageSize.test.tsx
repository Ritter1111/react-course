import { render, screen } from "@testing-library/react";
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
});
