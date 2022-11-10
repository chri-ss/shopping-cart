import React from "react";

const Pages = ({ cards, setPage }) => {
  return (
    <ul className="pages">
      {/* {cards.map((chunk) => (
        <li
          key={cards.indexOf(chunk)}
          className="page"
          onClick={() => setPage(cards.indexOf(chunk) + 1)}
        >
          {cards.indexOf(chunk) + 1}
        </li>
      ))} */}
    </ul>
  );
};

export default Pages;
