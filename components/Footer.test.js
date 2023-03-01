import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./Footer";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("next/dist/client/router", () => require("next-router-mock"));

test("renders footer with correct icons on index page", () => {
  mockRouter.setCurrentUrl("/");

  render(<Footer />);
  const homeFilled = screen.getByTestId("home-filled");
  const heartOutline = screen.getByTestId("heart-outline");
  expect(homeFilled).toBeInTheDocument();
  expect(heartOutline).toBeInTheDocument();
});

test("renders footer with correct icons on favourites page", () => {
  mockRouter.setCurrentUrl("/favourites");

  render(<Footer />);
  const homeOutline = screen.getByTestId("home-outline");
  const heartFilled = screen.getByTestId("heart-filled");
  expect(homeOutline).toBeInTheDocument();
  expect(heartFilled).toBeInTheDocument();
});
