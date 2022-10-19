import { useEffect } from "react";

const CardFilter = ({ sets, loadSets, handleSetChange }) => {
  useEffect(() => {
    loadSets();
    console.log(sets);
  }, []);
  return (
    <form name="card-filter">
      <label>Set</label>
      <select onChange={handleSetChange}>
        {sets.data.map((set) => {
          return (
            <option key={set.code} value={set.code}>
              {set.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default CardFilter;
