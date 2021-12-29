import { render, fireEvent, queryAllByText } from '@testing-library/react';
import Flipper from "./Flipper"

/**
 * Mock the Math.random function so that the first flip is always heads, and the second tails
 */
beforeEach(function () {
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.25)
    .mockReturnValueOnce(0.75);
});

/**
 * Undo the mock after all tests
 */
afterEach(function () {
  Math.random.mockRestore();
});

it("renders without crashing", () => {
  render(<Flipper />)
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Flipper />);
  expect(asFragment()).toMatchSnapshot();
});

it("does not initially show the coin", () => {
  const { getByAltText } = render(<Flipper />);
  expect(getByAltText("no coin")).toBeInTheDocument();
});

it("can flip the coin and update statistics", () => {
  const { queryByText, getByAltText } = render(<Flipper />);

  expect(queryByText("Out of 0 flips, there have been 0 heads and 0 tails.")).toBeInTheDocument();

  const flipButton = queryByText("Flip");

  // flip the coin once
  fireEvent.click(flipButton);

  expect(getByAltText("heads")).toBeInTheDocument();
  expect(queryByText("Out of 1 flips, there have been 1 heads and 0 tails.")).toBeInTheDocument();

  // flip again
  fireEvent.click(flipButton);

  expect(getByAltText("tails")).toBeInTheDocument();
  expect(queryByText("Out of 2 flips, there have been 1 heads and 1 tails.")).toBeInTheDocument();
});

it("can be reset", () => {
  const { queryByText, getByAltText } = render(<Flipper />);

  expect(queryByText("Out of 0 flips, there have been 0 heads and 0 tails.")).toBeInTheDocument();

  const flipButton = queryByText("Flip");

  // flip the coin twice
  fireEvent.click(flipButton);
  fireEvent.click(flipButton);

  expect(queryByText("Out of 2 flips, there have been 1 heads and 1 tails.")).toBeInTheDocument();

  const resetButton = queryByText("Reset");

  // reset the coin
  fireEvent.click(resetButton);

  expect(getByAltText("no coin")).toBeInTheDocument();
  expect(queryByText("Out of 0 flips, there have been 0 heads and 0 tails.")).toBeInTheDocument();
});