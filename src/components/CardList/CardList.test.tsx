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

describe("CardList component", () => {
  beforeEach(() => {});

  it("renders the specified number of cards", async () => {
    await act(async () => {
      render(<CardList cards={items} />);
    });

    await waitFor(() => {
      expect(document.body.getElementsByClassName("card").length).toBe(
        items.length,
      );
    });
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
