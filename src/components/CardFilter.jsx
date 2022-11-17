import React from "react";

const CardFilter = ({
  sets,
  handleSetChange,
  currentSet,
  filter,
  handleFilterChange,
}) => {
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
      <fieldset className="options">
        <label htmlFor="W">white</label>
        <input
          type="checkbox"
          name="W"
          checked={filter.W}
          onChange={handleFilterChange}
        />
        <label htmlFor="B">black</label>
        <input
          type="checkbox"
          name="B"
          checked={filter.B}
          onChange={handleFilterChange}
        />
        <label htmlFor="U">blue</label>
        <input
          type="checkbox"
          name="U"
          checked={filter.U}
          onChange={handleFilterChange}
        />
        <label htmlFor="G">green</label>
        <input
          type="checkbox"
          name="G"
          checked={filter.G}
          onChange={handleFilterChange}
        />
        <label htmlFor="R">red</label>
        <input
          type="checkbox"
          name="R"
          checked={filter.R}
          onChange={handleFilterChange}
        />
        <label htmlFor="">colorless</label>
        <input
          type="checkbox"
          name="C"
          checked={filter.C}
          onChange={handleFilterChange}
        />
      </fieldset>
    </form>
  );
};

export default CardFilter;
