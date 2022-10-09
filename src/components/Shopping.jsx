import { useEffect } from "react";
import CardOptions from "./CardOptions";

const Shopping = ({ cards, cardLoader }) => {
  useEffect(() => {
    cardLoader();
    console.log(cards);
  }, []);

  return (
    <div className="route">
      <CardOptions />
      <section className="shopping">
        <div>
          <ul className="card-container">
            {cards.data.map((card) => (
              <li className="card">
                <img src={card.image_uris.border_crop}></img>;
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Shopping;
