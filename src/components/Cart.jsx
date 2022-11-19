import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cart, handleCountChange }) => {
  return (
    <div className="route ">
      <section className="cart">
        <h2>Cart</h2>
        <table className="cart-table">
          <thead>
            <tr>
              <th>Qty</th>
              <th>Card Name</th>
              <th>Version</th>
              <th className="preview">Preview</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((card) => {
              return (
                <tr key={card.id}>
                  <td>
                    <button id={card.id} onClick={handleCountChange}>
                      -
                    </button>
                    {card.counter}
                    <button id={card.id} onClick={handleCountChange}>
                      +
                    </button>
                  </td>
                  <td>{card.name}</td>
                  <td>{card.set_name}</td>
                  <td className="preview">
                    {<img className="loading" src={card.image_uris.png}></img>}
                  </td>
                  <td>${(card.prices.usd * card.counter).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="total">Total</td>
              <td>
                $
                {cart.length > 0
                  ? cart
                      .flatMap((card) => card.prices.usd * card.counter)
                      .reduce((prev, curr) => (prev += curr))
                      .toFixed(2)
                  : 0}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="checkout">
          <Link className="checkout-link" to="/checkout">
            checkout
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Cart;
