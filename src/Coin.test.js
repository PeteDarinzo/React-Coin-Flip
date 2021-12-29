import { render, screen } from '@testing-library/react';
import Coin from './Coin';

it("renders without crashing", () => {
  render(<Coin face="heads" />)
  render(<Coin face="tails" />)
  render(<Coin face={null} />)
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Coin face="heads" />);
  expect(asFragment()).toMatchSnapshot();
});