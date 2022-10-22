const CardFilter = ({ sets, handleSetChange, currentSet }) => {
  return (
    <form name="card-filter">
      <label>Set</label>
      <select onChange={handleSetChange}>
        {sets.data.map((set) => {
          return (
            <option
              key={set.code}
              value={set.code}
              selected={set.code === currentSet}
            >
              {set.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default CardFilter;
