import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";

test("renders home", () => {
  render(<App />);
  const linkElement = screen.getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});
