import "./App.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import Cart from "./components/Cart";

const App = () => {
  return (
    <HashRouter>
      <NavLinks />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
