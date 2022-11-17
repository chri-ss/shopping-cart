import React from "react";
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";
import CardArea from "./components/CardArea";

const App = () => {
  const [cards, setCards] = useState([[]]);
  const [currentSet, setCurrentSet] = useState("bro");
  const [sets, setSets] = useState({ data: [{ name: "" }] });
  const [page, setPage] = useState(1);
  const [cardCache, setCardCache] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState({
    W: true,
    B: true,
    U: true,
    G: true,
    R: true,
    C: true,
  });

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

  const addFilters = (cards) => {
    return cards.map((card) => ({ ...card, filtered: false }));
  };

  const cacheCards = () => {
    if (cardCache.some((el) => el.set === currentSet)) {
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
      const filteredForRelevantData = filteredForImages.map((card) => {
        return {
          set: card.set,
          set_id: card.set_id,
          set_name: card.set_name,
          name: card.name,
          id: card.id,
          image_uris: card.image_uris,
          prices: card.prices,
          colors:
            //ternary is for colorless case for filter
            card.colors.length === 0 && card.color_identity.length === 0
              ? "C"
              : card.colors,
          color_identity: card.color_identity,
        };
      });
      const counters = addCounters(filteredForRelevantData);
      const finalCardData = addFilters(counters);
      setCards(paginate(finalCardData, 50));
    }
    // await filterCards();
  };

  const handleSetChange = async (e) => {
    setCurrentSet(e.target.value.toString());
    setPage(1);
  };

  const handleCountChange = (e) => {
    let localCounter;

    if (e.target.textContent === "-") {
      localCounter = -1;
    } else if (e.target.textContent === "+") {
      localCounter = 1;
    } else if (
      e.target.nodeName === "INPUT" &&
      typeof (e.target.value === "number")
    ) {
      localCounter = e.target.value;
    } else {
      return;
    }

    const flatCards = cards.flat();

    setCards(
      paginate(
        flatCards.map((card) => {
          if (card.id === e.target.id) {
            return { ...card, counter: card.counter + localCounter };
          } else {
            return card;
          }
        }),
        50
      )
    );
    setCardCache(
      cardCache.map((el) => {
        if (el.set === currentSet) {
          return { ...el, cards: cards };
        } else {
          return el;
        }
      })
    );
  };

  const refreshCart = () => {
    const flatCards = cardCache.flatMap((item) => item.cards).flat();
    const freshCart = flatCards.filter((card) => card.counter > 0);
    setCart(freshCart);
  };

  const clearImages = () => {
    filterCards();
    const images = document.querySelectorAll("img");
    images.forEach((img) => (img.src = ""));
  };

  const handleFilterChange = (e) => {
    const symbol = e.target.name;
    setFilter({
      ...filter,
      [`${symbol}`]: filter[symbol] === true ? false : true,
    });
  };

  const checkFilter = (card) => {
    let flag = false;
    for (const key in filter) {
      if (
        (card.colors.includes(key) || card.color_identity.includes(key)) &&
        filter[key] === false
      ) {
        flag = true;
      }
    }
    return { ...card, filtered: flag };
  };

  const filterCards = () => {
    const flatCards = cards.flat();
    const filteredCards = flatCards.map((card) => checkFilter(card));
    const unfiltered = filteredCards.filter((card) => card.filtered === false);
    const sortedUnfiltered = unfiltered.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return;
    });
    const filtered = filteredCards.filter((card) => card.filtered === true);
    const recombined = paginate(sortedUnfiltered, 50).concat([filtered]);
    // setCards(recombined);
    return recombined;
  };

  useEffect(() => {
    loadSets();
  }, []);

  useEffect(() => {
    clearImages();
    loadCards();
    setFilter(filter);
  }, [currentSet]);

  useEffect(() => {
    cacheCards();
    refreshCart();
    console.log(cardCache);
  }, [cards]);

  useEffect(() => {
    setCards(filterCards());
    setPage(1);
  }, [filter]);

  return (
    <BrowserRouter basename="/shopping-cart">
      <NavLinks cart={cart} currentSet={currentSet} page={page} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shopping/"
          element={
            <Shopping
              loadCards={loadCards}
              currentSet={currentSet}
              currentPage={page}
              setCurrentSet={setCurrentSet}
              setPage={setPage}
              filterCards={filterCards}
            />
          }
        >
          <Route
            path="/shopping/:set/:page"
            element={
              <CardArea
                cards={cards}
                setPage={setPage}
                page={page}
                handleSetChange={handleSetChange}
                handleCountChange={handleCountChange}
                sets={sets}
                currentSet={currentSet}
                filter={filter}
                handleFilterChange={handleFilterChange}
              />
            }
          />
        </Route>
        <Route
          path="/cart"
          element={<Cart cart={cart} handleCountChange={handleCountChange} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
