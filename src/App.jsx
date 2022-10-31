import React from "react";
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
  const [cart, setCart] = useState([]);

  const loadSets = async () => {
    const response = await fetch("https://api.scryfall.com/sets/");
    const allSets = await response.json();
    const filteredSets = {
      ...allSets,
      data: allSets.data.filter(
        (set) =>
          (set.set_type === "core" || set.set_type === "expansion") &&
          set.card_count > 0
      ),
    };
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
    const flatCardCache = cardCache.map((set) => set.cards.flat());
    const setWithCard = flatCardCache.find((set) =>
      set.some((card) => card.id === e.target.id)
    );
    const cardToChange = setWithCard.find((card) => card.id === e.target.id);

    if (e.target.textContent === "-") {
      cardToChange.counter = cardToChange.counter - 1;
    } else if (e.target.textContent === "+") {
      cardToChange.counter = cardToChange.counter + 1;
    } else if (
      e.target.nodeName === "INPUT" &&
      typeof (e.target.value === "number")
    ) {
      cardToChange.counter = e.target.value;
    } else {
      return;
    }
    console.log(setWithCard);
    setCardCache(
      cardCache.map((el) => {
        if (el.cards.some((card) => card.id === e.target.id)) {
          return { ...el, cards: paginate(setWithCard, 50) };
        } else {
          return el;
        }
      })
    );
    loadCards();
    refreshCart();
  };

  const refreshCart = () => {
    const flatCards = cardCache.flatMap((item) => item.cards).flat();
    const freshCart = flatCards.filter((card) => card.counter > 0);
    setCart(freshCart);
  };

  const clearImages = () => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => (img.src = ""));
  };

  useEffect(() => {
    loadSets();
  }, []);

  useEffect(() => {
    clearImages();
    loadCards();
  }, [currentSet]);

  useEffect(() => {
    cacheCards();
    refreshCart();
  }, [cards]);

  return (
    <HashRouter>
      <NavLinks cart={cart} />
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
            />
          }
        />
        <Route
          path="cart"
          element={<Cart cart={cart} handleCountChange={handleCountChange} />}
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
