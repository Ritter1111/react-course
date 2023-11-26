import React from "react";
import { render } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

describe("ErrorBoundary component", () => {
  it("renders children when there is no error", () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div data-testid="child">Test Child</div>
      </ErrorBoundary>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("renders NotFound component when there is an error", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const ErrorThrowingComponent = () => {
      throw new Error("Test error");
    };

    const { getByTestId } = render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(getByTestId("not-found")).toBeInTheDocument();
  });
});
