import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { CardList } from "./CardList";

const items = [
  {
    mal_id: 1,
    title: "Card 1",
    images: { jpg: { image_url: "https://image1.jpg" } },
  },
];

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
  it("renders the specified number of cards", async () => {
    await act(async () => {
      render(<CardList cards={items} />);
    });

    const cards = document.body.getElementsByClassName("card");

    expect(cards).toHaveLength(items.length);
  });

  it("Check that an appropriate message is displayed if no cards are present", async () => {
    await act(async () => {
      render(<CardList cards={[]} />);
    });

    await waitFor(() => {
      expect(screen.getByText("No data received")).toBeInTheDocument();
    });
  });
});
