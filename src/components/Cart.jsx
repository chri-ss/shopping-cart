import { useEffect } from "react";

const Cart = ({ cart }) => {
  useEffect(() => {
    console.log(cart);
  }, []);
  return (
    <div className="route cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((card) => {
          return <li>{card.name} : {card.counter}</li>;
        })}
      </ul>
    </div>
  );
};

export default Cart;
