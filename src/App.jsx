import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";

const App = () => {
  const [cards, setCards] = useState([[]]);
  const [currentSet, setCurrentSet] = useState("bro");
  const [sets, setSets] = useState({ data: [{ name: "" }] });
  const [page, setPage] = useState(1);
  const [cardCache, setCardCache] = useState([]);
  const [cart, setCart] = useState({});

  const loadSets = async () => {
    const response = await fetch("https://api.scryfall.com/sets/");
    const allSets = await response.json();
    const filteredSets = {
      ...allSets,
      data: allSets.data.filter(
        (set) => set.set_type === "core" || set.set_type === "expansion"
      ),
    };
    setSets(filteredSets);
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

  const addCounters = (cards) => {
    return cards.map((card) => ({ ...card, counter: 0 }));
  };

  const cacheCards = () => {
    if (cardCache.some((el) => el.set === cards[0][0].set)) {
      return;
    } else {
      setCardCache([
        ...cardCache,
        { set: cards[0][0] ? cards[0][0].set : null, cards: cards },
      ]);
    }
  };

  const loadCards = async () => {
    if (cardCache.some((el) => el.set === currentSet)) {
      await setCards(cardCache.find((el) => el.set === currentSet).cards);
    } else {
      const response = await fetch(
        `https://api.scryfall.com/cards/search?q=s%3A${currentSet}`
      );
      const cardData = await response.json();
      const moreCardData = await checkForMoreCards(cardData);
      const filteredForImages = filterOutMissingImages(moreCardData);
      const finalCardData = addCounters(filteredForImages);
      setCards(paginate(finalCardData, 50));
    }
  };

  const handleSetChange = async (e) => {
    setCurrentSet(e.target.value.toString());
    setPage(1);
    await loadCards();
  };

  const handleCountChange = (e) => {
    const flatCards = cards.flat();
    const cardToChange = flatCards.find((card) => card.id === e.target.id);
    if (e.target.textContent === "-") {
      cardToChange.counter = cardToChange.counter - 1;
    } else if (e.target.textContent === "+") {
      cardToChange.counter = cardToChange.counter + 1;
    } else if (e.target.nodeName === "INPUT") {
      cardToChange.counter = parseInt(e.target.value);
    }
    setCards(paginate(flatCards, 50));
  };

  // const incrementCount = (e) => {
  //   const flatCards = cards.flat();
  //   const cardToChange = flatCards.find((card) => card.id === e.target.id);
  //   cardToChange.counter = cardToChange.counter + 1;
  //   setCards(paginate(flatCards, 50));
  // };

  // const decrementCount = (e) => {
  //   console.log(e.target.textContent);
  //   const flatCards = cards.flat();
  //   const cardToChange = flatCards.find((card) => card.id === e.target.id);
  //   cardToChange.counter = cardToChange.counter - 1;
  //   setCards(paginate(flatCards, 50));
  // };

  useEffect(() => {
    loadCards();
    console.log(sets);
  }, [currentSet]);

  useEffect(() => {
    cacheCards();
  }, [cards]);

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
              handleCountChange={handleCountChange}
              // incrementCount={incrementCount}
              // decrementCount={decrementCount}
              const
            />
          }
        />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
