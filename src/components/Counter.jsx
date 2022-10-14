const Counter = () => {
  return (
    <div className="counter">
      <button>-</button>
      <input className="counter-input" value={0}></input>
      <button>+</button>
    </div>
  );
};

export default Counter;
