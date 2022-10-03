import React from "react";
import { Vitest, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "./App.css";
import "./reset.css";
import "@testing-library/jest-dom";

it("renders a hello message", () => {
  render(<App />);

  const message = screen.getByTestId("app");

  expect(message.textContent).toBe("hello");
});

it("can test the dom", () => {
  render(<App />);

  const message = screen.getByTestId("app");

  expect(message).toBeInTheDocument();
});
