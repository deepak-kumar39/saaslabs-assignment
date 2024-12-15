import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        projects: [
          { [s.no]: 0, [amt.pledged]: 15283, [percentage.funded]: 8200 },
          { [s.no]: 1, [amt.pledged]: 5000, [percentage.funded]: 10000 },
          { [s.no]: 2, [amt.pledged]: 7000, [percentage.funded]: 7000 },
          { [s.no]: 3, [amt.pledged]: 8000, [percentage.funded]: 10000 },
          { [s.no]: 4, [amt.pledged]: 10000, [percentage.funded]: 10000 },
          { [s.no]: 5, [amt.pledged]: 2000, [percentage.funded]: 10000 },
        ],
      },
    })
  ),
}));

test("renders loader initially", () => {
  render(<App />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test("renders table after data fetch", async () => {
  render(<App />);
  const projectRow = await screen.findByText("15283");
  expect(projectRow).toBeInTheDocument();
});

test("pagination works correctly", async () => {
  render(<App />);
  await screen.findByText("15283");

  const nextButton = screen.getByText(/Next/i);
  fireEvent.click(nextButton);
  expect(screen.getByText(/2000/)).toBeInTheDocument();

  const prevButton = screen.getByText(/Previous/i);
  fireEvent.click(prevButton);
  expect(screen.getByText(/15283/)).toBeInTheDocument();
});