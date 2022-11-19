import React from "react";

import { Link } from "react-router-dom";
const NavLinks = ({ cart, currentSet, page }) => {
  return (
    <nav className="header">
      <ul className="navlinks">
        <Link to="//">
          <li>Home</li>
        </Link>
        <Link to={`/shopping/${currentSet}/${page}`}>
          <li>Shopping</li>
        </Link>
        <Link to="/cart">
          <li>Cart</li>
          <div className="cart-counter">{cart.length}</div>
        </Link>
      </ul>
    </nav>
  );
};

export default NavLinks;
