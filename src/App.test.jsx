import React from "react";
import { Vitest, describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: [
          {
            id: "1234",
            image_uris: {
              large:
                "https://cards.scryfall.io/border_crop/front/e/5/e5f9fa2d-4bf4-4fcb-9b76-fd4a9ff5a58c.jpg?1576382187",
            },
            prices: { usd: 0.01 },
            counter: 0,
          },
        ],
      }),
  })
);

describe("Routes to different tabs", () => {
  it("moves to shopping tab", async () => {
    act(() => render(<App />));
    const shopping = screen.getByText("Shopping");
    await userEvent.click(shopping);

    expect(screen.getByRole("img").toBeInTheDocument);
  });

  it("moves to cart tab", async () => {
    act(() => render(<App />));
    const cart = screen.getByText("Cart");
    await userEvent.click(cart);

    expect(screen.getByRole("heading", { level: 2 }).toBeInTheDocument);
  });
});

describe("counter increments/decrements", () => {
  beforeEach(async () => {
    act(() => render(<App />));
    const shopping = screen.getByText("Shopping");
    await userEvent.click(shopping);
  });

  it("increments", async () => {
    const inc = screen.getByText("+");
    await userEvent.click(inc);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("1");
  });

  it("decrements", async () => {
    const dec = screen.getByText("-");
    await userEvent.click(dec);

    const input = screen.getByRole("textbox");

    expect(input).toHaveValue("-1");
  });
});
