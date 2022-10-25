import React from "react";

import { Link } from "react-router-dom";
const NavLinks = () => {
  return (
    <nav className="header">
      <ul className="navlinks">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/shopping">
          <li>Shopping</li>
        </Link>
        <Link to="/cart">
          <li>Cart</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavLinks;
