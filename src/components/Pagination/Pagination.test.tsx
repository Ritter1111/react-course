import { act, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockedUseQuery = vi.hoisted(() => vi.fn());

  vi.mock("../../hooks/useQueryParams", () => ({
    useQueryParams: mockedUseQuery,
  }));

  const onPageChangeMock = vi.fn();
  const setSearchParamsMock = vi.fn();
  const queryPageMock = "2";
  const queryLimitMock = "10";
  const pageInfo = {
    currPage: 2,
    totalPages: 5,
  };

  beforeEach(() => {
    mockedUseQuery.mockImplementationOnce(() => ({
      queryPage: queryPageMock,
      queryLimit: queryLimitMock,
      setSearchParams: setSearchParamsMock,
    }));

    render(
      <BrowserRouter>
        <Pagination onPageChange={onPageChangeMock} pageInfo={pageInfo} />
      </BrowserRouter>,
    );
  });

  it("should update url query parametr when page changes", () => {
    act(() => {
      fireEvent.click(screen.getByText("Next"));
      expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      page: "3",
      limit: queryLimitMock,
    });
  });

  it("click on the next button", () => {
    act(() => {
      fireEvent.click(screen.getByText("Next"));
      expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });
  });

  it("click on the prev button", () => {
    act(() => {
      fireEvent.click(screen.getByText("Prev"));
      expect(onPageChangeMock).toHaveBeenCalledWith(1);
    });
  });
});
