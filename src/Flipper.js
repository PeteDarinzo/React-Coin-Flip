import React, { useState } from "react";
import Coin from "./Coin";
import "./Flipper.css"

function Flipper(props) {

  /** hook for face-up side of coin */
  const [side, setSide] = useState(null);
  /** hook for coin flip statistics */
  const [count, setCount] = useState({
    total: 0,
    heads: 0,
    tails: 0
  });

  /** Determine face up side based on random 0 or 1 */
  const generateSide = () => {
    let side = ""
    let randBit = Math.floor(Math.random() * 2);
    if (randBit === 1) {
      side = "tails";
      count.tails++;
    } else {
      side = "heads";
      count.heads++;
    }
    return side;
  }

  /** Reset the coin and counters */
  const reset = () => {
    setSide(null);
    setCount({
      total: 0,
      heads: 0,
      tails: 0
    });
  }

  /** Handle coin flip upon button click
   * Explanation of using state with objects: https://react-hooks-cheatsheet.com/usestate
   */
  const flip = () => {
    // determine the new side, cast as a String to avoid errors when updating the count
    const side = String(setSide(generateSide()));
    // the entire object must be passed into the set function, since it replaced, not merged
    setCount({
      ...count, // spread all values into the new object, note that only the face-down side will be unchanged
      ["total"]: count["total"] + 1, // total count will always be updated
      [side]: count[side] + 1 // take the face up side, and increment
    });
  }

  return (
    <div className="Flipper">
      <h1>Flip a coin.</h1>
      <Coin face={side} />
      <button className="Flipper-button" onClick={flip}>Flip</button>
      <button className="Flipper-button" onClick={reset}>Reset</button>
      <p>Out of {count.total} flips, there have been {count.heads} heads and {count.tails} tails.</p>
    </div>
  );
}

export default Flipper;