import React from "react";

import { Outlet } from "react-router-dom";

const Shopping = () => {
  return (
    <div className="route">
      <section className="shopping">
        <Outlet />
      </section>
    </div>
  );
};

export default Shopping;
