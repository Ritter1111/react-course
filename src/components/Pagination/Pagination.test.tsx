import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Pagination } from "./Pagination";

const mockedUseRouter = vi.hoisted(() => vi.fn());
const mockedRouter = {
  query: { limit: "10", page: "2" },
  push: vi.fn(),
};

vi.mock("next/router", () => ({
  useRouter: () => mockedRouter,
  ...mockedUseRouter,
}));

describe("Pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const pageInfo = {
    last_visible_page: 5,
    has_next_page: true,
    current_page: 2,
  };

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Pagination pageInfo={pageInfo} />
      </BrowserRouter>,
    );
  });

  it("should update url query parameter when page changes", () => {
    act(() => {
      fireEvent.click(screen.getByText("Next"));
    });

    expect(mockedRouter.push).toHaveBeenCalledWith({
      query: { ...mockedRouter.query, page: 3 },
    });
  });

  it("click on the next button", () => {
    act(() => {
      fireEvent.click(screen.getByText("Next"));
    });
    expect(mockedRouter.push).toHaveBeenCalledWith({
      query: { ...mockedRouter.query, page: pageInfo.current_page + 1 },
    });
  });

  it("click on the prev button", () => {
    act(() => {
      fireEvent.click(screen.getByText("Prev"));
    });

    expect(mockedRouter.push).toHaveBeenCalledWith({
      query: { ...mockedRouter.query, page: pageInfo.current_page - 1 },
    });
  });
});
