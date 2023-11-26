import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { Card } from "./Card";
import { cardProps, detailedMockData } from "../../test/mock_data";
import { server } from "../../test/server";
import { rest } from "msw";

const mockedUseRouter = vi.hoisted(() => vi.fn());
const mockedRouter = {
  query: { limit: "10", page: "2" },
  push: vi.fn(),
};

vi.mock("next/router", () => ({
  useRouter: () => mockedRouter,
  ...mockedUseRouter,
}));

describe("Card component", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders card data correctly", async () => {
    render(<Card {...cardProps} />);

    expect(screen.getByText(/Sample Card/i)).toBeDefined();

    const cardImage = screen.getByTestId("card-image");
    expect(cardImage).toHaveAttribute("alt");
    expect(cardImage.getAttribute("src")).toMatch("sample-image.jpg");
  });

  it.skip("Validate that clicking on a card opens a detailed card component", async () => {
    render(<Card {...cardProps} />);

    await act(async () => {
      const cardContainer = screen.getByTestId("card-container");
      fireEvent.click(cardContainer);
    });

    server.use(
      rest.get("https://api.jikan.moe/v4/manga/1", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(detailedMockData));
      }),
    );

    await waitFor(() => {
      const cardContainer = screen.getByTestId("details");
      expect(cardContainer).toBeInTheDocument();
    });
  });

  it.skip("Check that clicking triggers an additional API call to fetch detailed information", async () => {
    render(<Card {...cardProps} />);

    server.use(
      rest.get("https://api.jikan.moe/v4/manga/1", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(detailedMockData));
      }),
    );

    await act(async () => {
      const cardContainer = screen.getByTestId("card-container");
      fireEvent.click(cardContainer);
    });

    await waitFor(() => {
      const cardContainer = screen.getByTestId("details");
      expect(cardContainer).toBeInTheDocument();
    });
  });
});
