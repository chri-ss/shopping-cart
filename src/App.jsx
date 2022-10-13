import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";

const App = () => {
  const [cards, setCards] = useState({ data: [[]] });
  const [currentSet, setCurrentSet] = useState("bro");
  const [sets, setSets] = useState({ data: [{ name: "" }] });
  const [page, setPage] = useState(1);

  const loadSets = async () => {
    const response = await fetch("https://api.scryfall.com/sets/");
    const allSets = await response.json();
    const filteredSets = {
      ...allSets,
      data: allSets.data.filter(
        (set) => set.set_type === "core" || set.set_type === "expansion"
      ),
    };
    console.log(filteredSets);
    setSets(filteredSets);
  };

  const paginate = (cards, perPage) => {
    const paginatedCards = [];
    let hold = [];
    const length = cards.length;
    for (let i = 0; i < length; ++i) {
      hold.push(cards.shift());
      if (hold.length === perPage) {
        paginatedCards.push(hold);
        hold = [];
      }
    }
    paginatedCards.push(hold);
    return paginatedCards;
  };

  const checkForMoreCards = async (cardData, cardHold = null) => {
    //ensures all cards in a set are loaded
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

  const filterOutMissingImages = (cards) => {
    return cards.filter((card) => card.image_uris);
  };

  const loadCards = async () => {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?q=s%3A${currentSet}`
    );
    const cardData = await response.json();
    const moreCardData = await checkForMoreCards(cardData);
    const finalCardData = filterOutMissingImages(moreCardData);
    setCards({ data: paginate(finalCardData, 50) });
  };

  const handleSetChange = async (e) => {
    setCurrentSet(e.target.value.toString());
    setPage(1);
    await loadCards();
  };

  useEffect(() => {
    loadCards();
    console.log(cards);
    console.log(page);
  }, [currentSet]);

  return (
    <HashRouter>
      <NavLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="shopping"
          element={
            <Shopping
              page={page}
              setPage={setPage}
              cards={cards}
              currentSet={currentSet}
              sets={sets}
              loadSets={loadSets}
              handleSetChange={handleSetChange}
            />
          }
        />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
