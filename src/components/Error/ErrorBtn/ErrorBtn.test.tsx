import React from "react";
import { render } from "@testing-library/react";
import { ErrorBtn } from "./ErrorBtn";

describe("ErrorBtn component", () => {
  it("renders without errors", () => {
    expect(() => render(<ErrorBtn />)).not.toThrow();
  });
});
