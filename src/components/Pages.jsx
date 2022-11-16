import React from "react";

const Pages = ({ cards, setPage, page }) => {
  return (
    <ul className="pages">
      {0 < cards.length < page && (
        <li className="page" onClick={() => setPage(page - 1)}>
          &lt;
        </li>
      )}

      {cards.map((chunk) => (
        chunk[0] && chunk[0].filtered === false &&
        <li
          key={cards.indexOf(chunk)}
          className={cards.indexOf(chunk) === page - 1 ? "active" : "page"}
          onClick={() => setPage(cards.indexOf(chunk) + 1)}
        >
          {cards.indexOf(chunk) + 1}
        </li>
      ))}
      {cards.length > page && (
        <li className="page" onClick={() => setPage(page + 1)}>
          &gt;
        </li>
      )}
    </ul>
  );
};

export default Pages;
