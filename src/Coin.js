import React from "react";
import heads from "./heads.jpg";
import tails from "./tails.jpg";
import "./Coin.css";


function Coin({ face }) {

  const getFace = () => {
    if (face === "heads") {
      return heads;
    } else if (face === "tails") {
      return tails;
    } else {
      return null;
    }
  }

  const getAlt = () => {
    if (face === "heads") {
      return "heads";
    } else if (face === "tails") {
      return "tails";
    } else {
      return "no coin";
    }
  }

  return (
    <div className="Coin">
      <img className="Coin-image" src={getFace()} alt={getAlt()}></img>
    </div>
  );
}

export default Coin;