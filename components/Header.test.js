import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

test("renders header with correct text on index page", () => {
  mockRouter.setCurrentUrl("/");

  render(<Header />);
  const appTitle = screen.getByText(/book quest/i);
  expect(appTitle).toBeInTheDocument();
});

test("renders header with correct text on favourites page", () => {
  mockRouter.setCurrentUrl("/favourites");

  render(<Header />);
  const headerText = screen.getByText(/your/i);
  expect(headerText).toBeInTheDocument();
});
