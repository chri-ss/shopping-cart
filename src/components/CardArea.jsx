import React from "react";
import Pages from "./Pages";
import Counter from "./Counter";
import CardFilter from "./CardFilter";

const CardArea = ({
  cards,
  sets,
  page,
  currentSet,
  setPage,
  handleCountChange,
  handleSetChange,
  filter,
  handleFilterChange,
}) => {
  return (
    <div>
      <CardFilter
        sets={sets}
        handleSetChange={handleSetChange}
        currentSet={currentSet}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Pages cards={cards} setPage={setPage} page={page} />
      <ul className="card-container">
        {cards[page - 1].map((card) => (
          <li key={card.id} id={card.id} className="card">
            <img
              src={card.image_uris.large}
              alt=" "
              className="loading
                  "
            ></img>
            <div className="price">${card.prices.usd}</div>
            <Counter card={card} handleCountChange={handleCountChange} />
          </li>
        ))}
      </ul>
      <Pages cards={cards} setPage={setPage} page={page} />
    </div>
  );
};

export default CardArea;
