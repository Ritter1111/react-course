import { render, screen } from "@testing-library/react";
import { NotFound } from "./NotFound";

describe("Not Found Component", () => {
  it("renders the component correctly", () => {
    render(<NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
