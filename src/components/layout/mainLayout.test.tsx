import React from "react";
import { render, screen } from "@testing-library/react";
import { ICardProps, MainLayout } from "./mainLayout";
import { mockData } from "../../test/mock_data";

const mockProps: ICardProps = {
  cards: mockData.data,
  pagination: mockData.pagination,
};

const mockedUseRouter = vi.hoisted(() => vi.fn());
const mockedRouter = {
  query: { limit: "10", page: "2" },
  push: vi.fn(),
};

vi.mock("next/router", () => ({
  useRouter: () => mockedRouter,
  ...mockedUseRouter,
}));

describe("MainLayout component", () => {
  it("renders children and components correctly", () => {
    render(
      <MainLayout {...mockProps}>
        <div data-testid="child">Test Child</div>
      </MainLayout>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();

    expect(screen.getByTestId("main")).toBeInTheDocument();
    expect(screen.getByTestId("error-btn")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByTestId("select-input")).toBeInTheDocument();
    expect(screen.getByTestId("card-container")).toBeInTheDocument();
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
