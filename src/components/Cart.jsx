import { useEffect } from "react";
import CardFilter from "./CardFilter";

const Cart = ({ cart }) => {
  return (
    <div className="route cart">
      <h2>Cart</h2>
      <table className="cart-table">
        <tr>
          <th>Qty</th>
          <th>Card Name</th>
          <th>Version</th>
          <th>Preview</th>
          <th>Cost</th>
        </tr>
        {cart.map((card) => {
          return (
            <tr>
              <td>{card.counter}</td>
              <td>{card.name}</td>
              <td>{card.set_name}</td>
              <td>{<img src={card.image_uris.small}></img>}</td>
              <td>{card.prices.usd * card.counter}</td>
            </tr>
          );
        })}
      </table>

      {/* {cart.map((card) => {
          return (
            <li>
              {card.name} : {card.counter}
            </li>
          );
        })} */}
    </div>
  );
};

export default Cart;
