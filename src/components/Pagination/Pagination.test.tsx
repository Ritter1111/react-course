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

  const mockedUseRouter = vi.hoisted(() => vi.fn());

  vi.mock("next/router", () => ({
    useRouter: mockedUseRouter,
  }));

  const onPageChangeMock = vi.fn();
  const queryPageMock = "2";
  const queryLimitMock = "10";
  const pageInfo = {
    currPage: 2,
    totalPages: 5,
  };

  beforeEach(() => {
    mockedUseRouter.mockImplementationOnce(() => ({
      query: {
        page: queryPageMock,
        limit: queryLimitMock,
      },
    }));

    render(
      <BrowserRouter>
        <Pagination onPageChange={onPageChangeMock} pageInfo={pageInfo} />
      </BrowserRouter>,
    );
  });

  it("should update url query parameter when page changes", () => {
    act(() => {
      fireEvent.click(screen.getByText("Next"));
      expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });

    expect(mockedUseRouter).toHaveBeenCalledWith();
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
