import React from "react";
import { render, act, fireEvent, screen } from "@testing-library/react";
import { CardSearch } from "./CardSearch";

const mockedUseRouter = vi.hoisted(() => vi.fn());
const mockedRouter = {
  query: { limit: "10", page: "2" },
  push: vi.fn(),
};

vi.mock("next/router", () => ({
  useRouter: () => mockedRouter,
  ...mockedUseRouter,
}));

describe("CardList component", () => {
  it("handles button click", async () => {
    await act(async () => {
      render(<CardSearch />);
    });

    const inputElement = screen.getByPlaceholderText("Type to search...");

    fireEvent.change(inputElement, { target: { value: "newQuery" } });

    fireEvent.click(screen.getByText("Search"));

    expect(mockedRouter.push).toHaveBeenCalledWith({
      query: { ...mockedRouter.query, q: "newQuery" },
    });
  });
});
