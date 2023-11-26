import { render, screen } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader component", () => {
  it("Loader Component", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
