import { render, screen, act, waitFor } from "@testing-library/react";
import { Details } from "./Details";
import { detailedMockData } from "../../test/mock_data";

const mockedUseRouter = vi.hoisted(() => vi.fn());
const mockedRouter = {
  query: { limit: "10", page: "2", details: "1" },
  push: vi.fn(),
};

vi.mock("next/router", () => ({
  useRouter: () => mockedRouter,
  ...mockedUseRouter,
}));

describe("Details component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("no loading indicator when loading finished", async () => {
    render(<Details data={detailedMockData} />);

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).toBeNull();
    });
  });

  it("Make sure the detailed card component correctly displays the detailed card data", async () => {
    await act(async () => {
      render(<Details data={detailedMockData} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Monster")).toBeInTheDocument();
      expect(screen.getByText("162")).toBeInTheDocument();
      expect(screen.getByText("Manga")).toBeInTheDocument();
      expect(screen.getByText("9.15")).toBeInTheDocument();
      expect(screen.getByText("Sample description")).toBeInTheDocument();

      const cardImage = screen.getByTestId("card-image");
      expect(cardImage).toHaveAttribute("alt");
      expect(cardImage.getAttribute("src")).toMatch("sample-image.jpg");
    });
  });
});
