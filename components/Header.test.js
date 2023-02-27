import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

test("renders header with correct test", () => {
  render(<Header />);
  const appTitle = screen.getByText(/book quest/i);
  expect(appTitle).toBeInTheDocument();
});
