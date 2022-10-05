import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";

const App = () => {
  const [cards, setCards] = useState("");

  const cardLoader = async () => {
    const response = await fetch(
      "https://api.scryfall.com/cards/search?q=s%3Aaer"
    );
    const cardData = await response.json();

    setCards(cardData);
  };

  useEffect(() => {
    cardLoader();
    console.log(cards);
  }, []);

  return (
    <HashRouter>
      <NavLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shopping" element={<Shopping cards={cards} />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
