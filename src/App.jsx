import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";

const App = () => {
  const [cards, setCards] = useState({ data: [] });

  const checkForMoreCards = async (cardData, cardHold = null) => {
    if (cardHold === null) {
      cardHold = cardData.data;
    }
    if (cardData.has_more) {
      const response = await fetch(cardData.next_page);
      const moreCardData = await response.json();
      cardHold = cardHold.concat(moreCardData.data);
      checkForMoreCards(moreCardData, cardHold);
    }
    return cardHold;
  };

  const cardLoader = async () => {
    const response = await fetch(
      "https://api.scryfall.com/cards/search?q=s%3Ausg"
    );
    const cardData = await response.json();
    const finalCardData = await checkForMoreCards(cardData);
    setCards({ data: finalCardData });
  };

  return (
    <HashRouter>
      <NavLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="shopping"
          element={<Shopping cards={cards} cardLoader={cardLoader} />}
        />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
