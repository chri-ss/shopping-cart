import React from "react";

import { useEffect } from "react";

const Counter = ({ card, handleCountChange }) => {
  return (
    <div className="counter">
      <button id={card.id} onClick={handleCountChange}>
        -
      </button>
      <input
        className="counter-input"
        name="counter"
        id={card.id}
        value={card.counter}
        onChange={handleCountChange}
      ></input>
      <button id={card.id} onClick={handleCountChange}>
        +
      </button>
    </div>
  );
};

export default Counter;
