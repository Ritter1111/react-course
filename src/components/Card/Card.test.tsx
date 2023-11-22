import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Card } from "./Card";
import { cardProps, detailedMockData } from "../../test/mock_data";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { server } from "../../test/server";
import { rest } from "msw";
import { Details } from "@/screens/Details/Details";

describe("Card component", async () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("renders card data correctly", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Card {...cardProps} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Sample Card/i)).toBeDefined();
    expect(screen.getByTestId("card-image")).toHaveAttribute(
      "src",
      "sample-image.jpg",
    );
    expect(screen.getByTestId("card-image")).toHaveAttribute("alt");
  });

  it.skip("Validate that clicking on a card opens a detailed card component", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

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

  it("Check that clicking triggers an additional API call to fetch detailed information", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Card {...cardProps} />} />
            <Route path="detail/:id" element={<Details />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

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
