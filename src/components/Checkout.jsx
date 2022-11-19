import React from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";

const Checkout = () => {
  return (
    <div className="checkout">
      <p>
        This is a demo only, not a real store. There is no checkout functionality
        <Link to="/cart" element={<Cart />}>
          Back
        </Link>
      </p>
    </div>
  );
};

export default Checkout;
