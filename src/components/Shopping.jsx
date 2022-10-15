import CardFilter from "./CardFilter";
import Pages from "./Pages.jsx";
import Counter from "./Counter";

const Shopping = ({
  cards,
  sets,
  loadSets,
  handleSetChange,
  page,
  setPage,
}) => {
  return (
    <div className="route">
      <section className="shopping">
        <CardFilter
          sets={sets}
          loadSets={loadSets}
          handleSetChange={handleSetChange}
        />
        <div>
          <Pages cards={cards} setPage={setPage} />
          <ul className="card-container">
            {cards.data[page - 1].map((card) => (
              <li key={card.id} id={card.id} className="card">
                <img src={card.image_uris ? card.image_uris.large : null}></img>
                <div className="price">${card.prices.usd}</div>
                <Counter />
              </li>
            ))}
          </ul>
          <Pages cards={cards} setPage={setPage} />
        </div>
      </section>
    </div>
  );
};

export default Shopping;
