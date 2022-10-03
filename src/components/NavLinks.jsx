import { Link } from "react-router-dom";
const NavLinks = () => {
  return (
    <nav>
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