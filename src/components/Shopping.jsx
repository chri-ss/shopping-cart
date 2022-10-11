import { useEffect } from "react";
import CardFilter from "./CardFilter";

const Shopping = ({
  cards,
  loadCards,
  sets,
  set,
  loadSets,
  handleSetChange,
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
          <ul className="card-container">
            {cards.data[0].map((card) => (
              <li key={card.id} className="card">
                <img
                  src={card.image_uris ? card.image_uris.border_crop : null}
                ></img>
                ;
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Shopping;
